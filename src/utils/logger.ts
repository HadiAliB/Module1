// src/utils/logger.ts
export const log = (message: string) => {
    console.log(`[${new Date().toISOString()}] ${message}`);
  };
  