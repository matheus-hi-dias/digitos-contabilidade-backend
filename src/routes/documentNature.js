import { Router } from 'express';

import documentNatureController from '../controllers/documentNaturesController.js';

const router = Router();

router.get('/', documentNatureController.index);
router.get('/:id', documentNatureController.show);
router.post('/', documentNatureController.store);
router.put('/:id', documentNatureController.update);
router.delete('/:id', documentNatureController.remove);

export { router };
