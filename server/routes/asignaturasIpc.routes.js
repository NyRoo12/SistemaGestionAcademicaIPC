import { Router } from "express";
import {
  getAsignaturasIPC,
} from "../controllers/asignaturasIpc.controller.js";

const router = Router();

// Routes
router.get("/", getAsignaturasIPC);

export default router;