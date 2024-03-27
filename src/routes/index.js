import { Router } from 'express';
import { router as documentNatureRouter } from './documentNature.js';
import { router as documentTypeRouter } from './documentType.js';

const router = Router();

router.use('/naturezas', documentNatureRouter);
router.use('/tipo-de-documento', documentTypeRouter);

export { router };
