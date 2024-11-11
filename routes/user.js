import { Router } from "express";
import { generatePdfFile, testUser } from "../controllers/userController.js"



const router = Router();

// Definir las rutas para user
router.get('/test-user', testUser );
router.get('/test-generate-pdf',generatePdfFile);




// Exportar el Router
export default router;