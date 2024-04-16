import { Router } from "express";

import documentsController from "../controllers/documentsController.js";

const router = Router();

router.post("/", documentsController.create);

export { router };
