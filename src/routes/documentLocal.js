import { Router } from 'express';

import documentLocalsController from '../controllers/documentLocalsController.js';

const router = Router();

router.get('/', documentLocalsController.index);
router.get('/:id', documentLocalsController.show);
router.post('/', documentLocalsController.store);
router.put('/:id', documentLocalsController.update);
router.delete('/:id', documentLocalsController.remove);

export { router };
