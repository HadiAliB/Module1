// src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import { uploadRouter } from './controllers/imageController';
import { authenticateJWT } from './middleware/authMiddleware';

dotenv.config();

const app = express();

app.use(express.json());
app.use(authenticateJWT);
app.use('/upload', uploadRouter);

export default app;
