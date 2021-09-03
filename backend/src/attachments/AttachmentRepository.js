import dependencyNames from '../constants/dependencyNames';
import modelNames from '../constants/modelNames';

export default class AttachmentRepository {
  constructor(beans) {
    this.AttachmentModel = beans[dependencyNames.database].models[modelNames.Attachment];
  }

  bulkCreate = async rows => {
    const attachments = await this.AttachmentModel.bulkCreate(rows);
    return attachments;
  }

  findAll = async (where, attributes, include) => {
    const attachments = await this.AttachmentModel.findAll({ where, attributes, include });
    return attachments;
  }

  updateOne = async (where, attributes) => {
    await this.AttachmentModel.update(attributes, { where, returning: true });
    const attachment = await this.AttachmentModel.findOne({ where });
    return attachment;
  }

  updateAll = async (where, attributes) => {
    await this.AttachmentModel.update(attributes, { where, returning: true });
    const attachments = await this.AttachmentModel.findAll({ where, attributes: ['id', 'attachmentLink', 'name'] });
    return attachments;
  }
}
