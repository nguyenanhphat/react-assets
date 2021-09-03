import { Router } from 'express';
import jwt from 'jsonwebtoken';
import Multer from 'multer';
import { uploadFiles } from '../attachments/AttachmentController';

const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 20 * 1024 * 1024, // no larger than 20mb
  },
});

const router = Router();

router.post('/',
  (req, res, next) => {
    req.user = jwt.decode(process.env.TOKEN);
    next();
  },
  multer.array('file', 4),
  uploadFiles);

export default router;
