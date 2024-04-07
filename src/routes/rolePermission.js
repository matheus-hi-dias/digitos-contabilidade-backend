import { Router } from 'express';

import rolePermissionsController from '../controllers/rolePermissionsController.js';

const router = Router();

router.get('/cargo/:id_cargo', rolePermissionsController.showByRole);
router.get('/permissao/:id_permissao', rolePermissionsController.showByPermission);
router.post('/', rolePermissionsController.store);

export { router };
