import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Initialize Pinecone Client
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

(async () => {
  try {
    const isValid = await pinecone.isValidConnection();
    if (isValid) {
      console.log('Pinecone client initialized successfully.');
    } else {
      console.error('Failed to validate Pinecone connection.');
    }
  } catch (error) {
    console.error('Error during Pinecone client initialization:', error);
  }
})();

// Define the Match interface
interface Match {
  id: string;
  score: number;
  metadata: Record<string, any>; // Adjust based on your metadata structure
}

// Function to search embeddings
export const searchEmbeddings = async (userId: string, embeddings: number[]) => {
  const index = pinecone.Index('your_index_name');

  try {
    const searchResults = await index.query({
      vector: embeddings,
      topK: 10,
      includeMetadata: true,
    });

    // Map over matches and return metadata
    return searchResults.matches.map((match: Match) => match.metadata);
  } catch (error) {
    console.error('Error searching embeddings:', error);
    throw new Error('Failed to search embeddings');
  }
};
