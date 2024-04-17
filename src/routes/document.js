import { Router } from "express";

import documentsController from "../controllers/documentsController.js";

const router = Router();

router.post("/", documentsController.create);
router.get("/", documentsController.show);
router.get("/:document_code", documentsController.index);
router.put("/:document_code", documentsController.update);
router.delete("/:document_code", documentsController.remove)

export { router };
