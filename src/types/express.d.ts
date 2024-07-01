// src/types/express.d.ts

// Importing the existing express module
import * as express from 'express';

// Extending the existing Request interface to include the `user` property
declare global {
  namespace Express {
    interface Request {
      user?: any; // or provide a specific type for your user object
    }
  }
}
