import { Router } from "express";
import { testQuestion } from "../controllers/questionController.js";




const router = Router();

// Definir las rutas para question
router.get('/test-question', testQuestion );




// Exportar el Router
export default router;