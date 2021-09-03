import stream from 'stream';
import dependencyNames from '../constants/dependencyNames';
import AttachmentDTO from './AttachmentDTO';

export default class AttachmentService {
  constructor(beans) {
    this.attachmentRepository = beans[dependencyNames.attachmentRepository];
    this.googleApis = beans[dependencyNames.googleApis];
  }

  uploadFiles = async (files, entityId, entityType) => {
    if (Array.isArray(files)) {
      const rootId = process.env.GOOGLE_DRIVE_ROOT_FOLDER;

      const promises = files.map(file => {
        const bufferStream = new stream.PassThrough();
        bufferStream.end(file.buffer);
        return this.googleApis.createFile(file.originalname, file.mimetype, bufferStream, [rootId]);
      });
      const resultFiles = await Promise.all(promises);

      const attachments = resultFiles.map(resultFile => ({
        entityId: entityId || null,
        attachmentLink: resultFile.id,
        entityType: entityType || null,
        name: resultFile.name,
      }));
      const resultAttachments = await this.attachmentRepository.bulkCreate(attachments);
      return resultAttachments.map(attachment => new AttachmentDTO(attachment).toJSON());
    }
    return [];
  };
}
