import {Router} from 'express';

import rolesController from '../controllers/rolesController.js';

const router = Router();

router.get('/', rolesController.index);
router.get('/:id', rolesController.show);
router.post('/', rolesController.store);
router.put('/:id', rolesController.update);
router.delete('/:id', rolesController.remove);

export {router};