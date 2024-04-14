import { Router } from "express";

import employeePermissionsController from "../controllers/employeePermissionsController.js";

const router = Router();

router.get("/:funcionario_id", employeePermissionsController.showByEmployee);
router.post("/", employeePermissionsController.store);
router.delete("/:funcionario_id/:permissao_id", employeePermissionsController.remove);

export {router}
