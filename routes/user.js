import { Router } from "express";
import { testUser } from "../controllers/userController.js";



const router = Router();

// Definir las rutas para user
router.get('/test-user', testUser );




// Exportar el Router
export default router;