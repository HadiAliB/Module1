// src/services/storageService.ts
import { Storage } from '@google-cloud/storage';
import { Firestore } from '@google-cloud/firestore';
import { generateEmbeddings } from './embeddingsService';

const storage = new Storage();
const firestore = new Firestore();

export const storeImageMetadata = async (userId: string, file: Express.Multer.File) => {
  const bucketName = process.env.GCS_BUCKET!;
  const bucket = storage.bucket(bucketName);

  const blob = bucket.file(file.filename);
  const blobStream = blob.createWriteStream();

  blobStream.end(file.buffer);

  await blobStream.on('finish', async () => {
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;

    await firestore.collection('images').doc(file.filename).set({
      userId,
      imageUrl: publicUrl,
      filename: file.filename,
    });

    return publicUrl;
  });
};

export const generateImageEmbeddings = async (imageUrl: string) => {
  return generateEmbeddings(imageUrl);
};
