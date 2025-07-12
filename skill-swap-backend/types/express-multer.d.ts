import 'express';

// Augment the Express Request type to include multer's file and files properties

declare module 'express-serve-static-core' {
  interface Request {
    file?: Express.Multer.File;
    files?: Express.Multer.File[];
  }
} 