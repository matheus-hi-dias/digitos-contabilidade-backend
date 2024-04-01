import {Router} from 'express';

import permissionsController from '../controllers/permissionsController.js';

const router = Router();

router.get('/', permissionsController.index);
router.get('/:id', permissionsController.show);
router.post('/', permissionsController.store);
router.put('/:id', permissionsController.update);
router.delete('/:id', permissionsController.remove);

export {router};