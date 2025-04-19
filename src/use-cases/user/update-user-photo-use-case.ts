import { prisma } from '../../lib/prisma';
import { UploadService } from '../../services/upload-photo';
import { ResourceNotFoundError } from '../@errors/resource-not-found-error';

export class UpdateUserAvatarUseCase {
  async execute(userId: string, avatarFilename: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new ResourceNotFoundError();
    }

    if (user.photo) {
      await UploadService.deleteImage(user.photo);
    }

    try{
    await prisma.user.update({
      where: { id: userId },
      data: { photo: avatarFilename },
    });

    return { message: 'Avatar updated successfully' };
    } catch (err) {
      return { message: 'Error updating avatar' };
    }
  }
}
