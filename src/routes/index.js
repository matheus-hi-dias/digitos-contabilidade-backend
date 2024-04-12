import { Router } from 'express';
import { router as authRouter } from './auth.js';
import { router as documentNatureRouter } from './documentNature.js';
import { router as documentTypeRouter } from './documentType.js';
import { router as documentLocalRouter } from './documentLocal.js';
import { router as permissionRouter } from './permission.js';
import { router as roleRouter } from './role.js';
import { router as rolePermissionRouter } from './rolePermission.js';
import { router as employeeRouter } from './employee.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/naturezas', documentNatureRouter);
router.use('/tipo-de-documento', documentTypeRouter);
router.use('/local-do-documento', documentLocalRouter);
router.use('/permissoes', permissionRouter);
router.use('/cargos', roleRouter);
router.use('/permissoes-cargos', rolePermissionRouter);
router.use('/funcionarios', employeeRouter);

export { router };
