import { Router } from 'express';

import documentTypesController from '../controllers/documentTypesController.js';

const router = Router();

router.get('/', documentTypesController.index);
router.get('/:id', documentTypesController.show);
router.post('/', documentTypesController.store);
router.put('/:id', documentTypesController.update);
router.delete('/:id', documentTypesController.remove);

export { router };
