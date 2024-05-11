import {Router} from 'express'

import employeesController from '../controllers/employeesController.js'

const router = Router();

router.get('/', employeesController.showMyProfile);

export {router};
