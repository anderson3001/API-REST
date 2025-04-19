import { promises as fsPromises } from 'fs';
import path from 'path';

export class UploadService {
    static async deleteImage(imagePath: string) {
      const fullPath = path.resolve(__dirname, '..', '..', 'uploads', imagePath);
  
      try {
        await fsPromises.access(fullPath);  
        await fsPromises.unlink(fullPath);  
      } catch (err) {
        return { message: 'Error deleting image' };
      }
    }
  }