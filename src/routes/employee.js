import {Router} from 'express'

import employeesController from '../controllers/employeesController.js'

const router = Router();

router.get('/', employeesController.index);
router.get('/:id', employeesController.show);
router.post('/novo-funcionario', employeesController.store);
router.put('/:id', employeesController.update);
router.delete('/:id', employeesController.remove);

export {router};
