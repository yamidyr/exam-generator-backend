import { Router } from "express";
import { getUser, login, register, testUser } from "../controllers/userController.js";
import { ensureAuth } from "../middlewares/auth.js";



const router = Router();

// Definir las rutas para user
router.get('/test-user', ensureAuth, testUser );
router.post('/register',register);
router.post('/login', login);
router.get('/get-user',ensureAuth,getUser);




// Exportar el Router
export default router;