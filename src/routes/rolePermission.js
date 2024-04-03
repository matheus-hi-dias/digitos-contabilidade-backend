import { Router } from 'express';

import rolePermissionsController from '../controllers/rolePermissionsController.js';

const router = Router();

router.post('/', rolePermissionsController.store);

export { router };
