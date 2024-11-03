import { Router } from "express";
import { testExam } from "../controllers/examController.js";




const router = Router();

// Definir las rutas para exam
router.get('/test-exam', testExam);




// Exportar el Router
export default router;