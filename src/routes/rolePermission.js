import { Router } from 'express';

import rolePermissionsController from '../controllers/rolePermissionsController.js';

const router = Router();

router.get('/role/:role_id', rolePermissionsController.showByRole);
router.get('/permission/:permission_id', rolePermissionsController.showByPermission);
router.post('/', rolePermissionsController.store);
router.delete('/role/:role_id/permission/:permission_id', rolePermissionsController.remove);

export { router };
