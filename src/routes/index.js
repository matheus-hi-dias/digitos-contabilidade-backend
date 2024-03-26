import { Router } from 'express';
import { router as documentNatureRouter } from './documentNature.js';

const router = Router();

router.use('/naturezas', documentNatureRouter);

export { router };
