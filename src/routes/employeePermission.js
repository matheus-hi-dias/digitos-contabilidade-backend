import { Router } from "express";

import employeePermissionsController from "../controllers/employeePermissionsController.js";

const router = Router();

router.get("/:employee_id", employeePermissionsController.showByEmployee);
router.post("/", employeePermissionsController.store);
router.delete("/employee/:employee_id/permission/:permission_id", employeePermissionsController.remove);

export {router}
