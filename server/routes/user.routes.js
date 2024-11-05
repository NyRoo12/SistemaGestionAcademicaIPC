import { Router } from "express";
import {
    getUserPassword,
} from "../controllers/user.controller.js";

const router = Router();


// Ruta para el login
router.post('/login', getUserPassword);

export default router;
