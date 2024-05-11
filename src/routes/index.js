import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { router as authRouter } from "./auth.js";
import { router as profileRouter } from "./profile.js";
import { router as documentNatureRouter } from "./documentNature.js";
import { router as documentTypeRouter } from "./documentType.js";
import { router as documentLocalRouter } from "./documentLocal.js";
import { router as permissionRouter } from "./permission.js";
import { router as roleRouter } from "./role.js";
import { router as rolePermissionRouter } from "./rolePermission.js";
import { router as employeeRouter } from "./employee.js";
import { router as employeePermissionRouter } from "./employeePermission.js";
import { router as clientRouter } from "./client.js";
import { router as documentRouter } from "./document.js";

const router = Router();

router.use("/auth", authRouter);

router.use(auth);

router.use("/my-profile", profileRouter);
router.use("/nature", documentNatureRouter);
router.use("/document-type", documentTypeRouter);
router.use("/document-location", documentLocalRouter);
router.use("/permissions", permissionRouter);
router.use("/roles", roleRouter);
router.use("/roles-permissions", rolePermissionRouter);
router.use("/employee", employeeRouter);
router.use("/employees-permissions", employeePermissionRouter);
router.use("/clients", clientRouter);
router.use("/documents", documentRouter);

export { router };
