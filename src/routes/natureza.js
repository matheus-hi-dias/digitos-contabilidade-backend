import { Router } from 'express';

import naturezasController from '../controllers/naturezasController.js';

const router = Router();

router.get('/', naturezasController.indexNaturezas);
router.get('/:id', naturezasController.showNaturezas);
router.post('/', naturezasController.storeNaturezas);
router.put('/:id', naturezasController.updateNaturezas);
router.delete('/:id', naturezasController.removeNaturezas);

export { router };
