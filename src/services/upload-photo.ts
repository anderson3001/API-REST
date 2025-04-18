import fs from 'fs';
import path from 'path';

export class UploadService {
  static deleteImage(imagePath: string) {
    const fullPath = path.resolve(__dirname, '..', '..', 'uploads', imagePath);

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  }
}