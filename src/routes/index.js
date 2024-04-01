import { Router } from 'express';
import { router as documentNatureRouter } from './documentNature.js';
import { router as documentTypeRouter } from './documentType.js';
import { router as documentLocalRouter } from './documentLocal.js';
import {router as permissionRouter} from './permission.js';
import {router as roleRouter} from './role.js';

const router = Router();

router.use('/naturezas', documentNatureRouter);
router.use('/tipo-de-documento', documentTypeRouter);
router.use('/local-do-documento', documentLocalRouter);
router.use('/permissoes', permissionRouter);
router.use('/cargos', roleRouter);

export { router };
