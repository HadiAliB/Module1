import { Configuration, OpenAI } from 'openai';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Initialize the OpenAI API client with the configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Load API key from environment variables
});
const openai = new OpenAIApi(configuration);

// Function to generate embeddings for a given image URL
export const generateEmbeddings = async (imageUrl: string) => {
  try {
    // Call the OpenAI API to create embeddings
    const response = await openai.createEmbedding({
      input: imageUrl,
      model: 'text-embedding-ada-002',
    });

    // Return the embeddings from the response
    return response.data.data[0].embedding;
  } catch (error) {
    console.error('Error generating embeddings:', error);
    throw new Error('Failed to generate embeddings');
  }
};
