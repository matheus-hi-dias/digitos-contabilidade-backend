import { Router } from 'express';
import { router as authRouter } from './auth.js';
import { router as documentNatureRouter } from './documentNature.js';
import { router as documentTypeRouter } from './documentType.js';
import { router as documentLocalRouter } from './documentLocal.js';
import { router as permissionRouter } from './permission.js';
import { router as roleRouter } from './role.js';
import { router as rolePermissionRouter } from './rolePermission.js';
import { router as employeeRouter } from './employee.js';
import { router as employeePermissionRouter } from './employeePermission.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/nature', documentNatureRouter);
router.use('/document-type', documentTypeRouter);
router.use('/document-location', documentLocalRouter);
router.use('/permissions', permissionRouter);
router.use('/roles', roleRouter);
router.use('/permissoes-cargos', rolePermissionRouter);
router.use('/funcionarios', employeeRouter);
router.use('/permissoes-funcionario', employeePermissionRouter);

export { router };
