import { Router } from "express";
import {
  getAsignaturasIPC,
} from "../controllers/asignaturasIpc.controller.js";

const router = Router();

// Routes
router.get("/", getAsignaturasIPC);

export default router;

// const express = require('express');
// const router = express.Router();

// const asignaturasIPCController = require('../controllers/asignaturasIpcController');

// // Obtener todas las asignaturasIPC
// router.get('/', asignaturasIPCController.obtenerAsignaturas);

// module.exports = router;
