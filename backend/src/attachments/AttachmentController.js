import { Injection } from '../injection';
import dependencyNames from '../constants/dependencyNames';

export const uploadFiles = async (req, res, next) => {
  try {
    const { files } = req;
    const { entityId, entityType } = req.body;
    const attachmentService = Injection.getService(req._containerDI, dependencyNames.attachmentService);
    const attachments = await attachmentService.uploadFiles(files, entityId, entityType);

    res.status(200).json({
      success: true,
      message: res.__('Success'),
      errorCode: null,
      data: { attachments },
    });
  } catch (e) {
    next(e);
  }
};
