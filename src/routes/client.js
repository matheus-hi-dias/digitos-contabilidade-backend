import { Router } from "express";

import clientsController from "../controllers/clientsController.js";

const router = Router();

router.post("/", clientsController.store);

export { router }
