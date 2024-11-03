import { Router } from "express";
import { testExamQuestions } from "../controllers/examQuestionsController.js";




const router = Router();

// Definir las rutas para examQuestions
router.get('/test-exam_questions', testExamQuestions );




// Exportar el Router
export default router;