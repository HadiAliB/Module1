// src/controllers/imageController.ts
import { Router } from 'express';
import multer from 'multer';
import { storeImageMetadata, generateImageEmbeddings } from '../services/storageService';
import { searchEmbeddings } from '../services/pineconeService';

const upload = multer({ dest: 'uploads/' });
export const uploadRouter = Router();

uploadRouter.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    if (!req.user || !req.user.id) { // Check if req.user and req.user.id are defined
      return res.status(401).send('Unauthorized: No user information.');
    }

    const userId = req.user.id; // Safe to use req.user.id now
    const imageUrl = await storeImageMetadata(userId, req.file);

    res.json({ imageUrl });
  } catch (error) {
    res.status(500).send('Error uploading image.');
  }
});

uploadRouter.post('/search', async (req, res) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) {
      return res.status(400).send('Image URL required for search.');
    }

    if (!req.user || !req.user.id) { // Check if req.user and req.user.id are defined
      return res.status(401).send('Unauthorized: No user information.');
    }

    const embeddings = await generateImageEmbeddings(imageUrl);
    const results = await searchEmbeddings(req.user.id, embeddings);

    res.json({ results });
  } catch (error) {
    res.status(500).send('Error performing search.');
  }
});
