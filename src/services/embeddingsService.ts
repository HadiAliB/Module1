import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize the OpenAI API client with the correct configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is a string
});

// Function to generate embeddings for a given image URL
export const generateEmbeddings = async (imageUrl: string) => {
  try {
    // Call the OpenAI API to create embeddings
    const response = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: imageUrl,
    });
    
    return response.data[0].embedding;
  } catch (error) {
    console.error('Error generating embeddings:', error);
    throw new Error('Failed to generate embeddings');
  }
};
