import {Router} from 'express'

import employeesController from '../controllers/employeesController.js'

const router = Router();

router.get('/', employeesController.index);
router.get('/my-profile', employeesController.showMyProfile);
router.get('/:id', employeesController.show);
router.post('/new-employee', employeesController.store);
router.put('/:id', employeesController.update);
router.delete('/:id', employeesController.remove);

export {router};
