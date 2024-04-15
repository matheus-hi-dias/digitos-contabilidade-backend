import { Router } from "express";

import clientsController from "../controllers/clientsController.js";

const router = Router();

router.post("/", clientsController.store);
router.get("/", clientsController.show);
router.get("/:id", clientsController.index);
router.put("/:id", clientsController.update);
router.delete("/:id", clientsController.remove);

export { router };
