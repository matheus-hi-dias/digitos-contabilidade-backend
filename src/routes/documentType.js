import { Router } from 'express';

import documentTypesController from '../controllers/documentTypesController.js';

const router = Router();

router.get('/', documentTypesController.index);
router.get('/:cod_tipo_doc', documentTypesController.show);
router.post('/', documentTypesController.store);
router.put('/:cod_tipo_doc', documentTypesController.update);
router.delete('/:cod_tipo_doc', documentTypesController.remove);

export { router };
