import { Router } from 'express';
import { router as documentNatureRouter } from './documentNature.js';
import { router as documentTypeRouter } from './documentType.js';
import { router as documentLocalRouter } from './documentLocal.js';

const router = Router();

router.use('/naturezas', documentNatureRouter);
router.use('/tipo-de-documento', documentTypeRouter);
router.use('/local-do-documento', documentLocalRouter);

export { router };
