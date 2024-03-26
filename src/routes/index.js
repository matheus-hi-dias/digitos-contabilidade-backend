import { Router } from 'express';
import { router as naturezaRouter } from './natureza.js';

const router = Router();

router.use('/naturezas', naturezaRouter);

export { router };
