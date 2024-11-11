import { Router } from "express";
import { createManyExamQuestions, testExamQuestions } from "../controllers/examQuestionsController.js";
import { ensureAuth } from "../middlewares/auth.js";




const router = Router();

// Definir las rutas para question
router.get('/test-exam-questions', testExamQuestions );
router.post('/create-many-exam-questions',ensureAuth, createManyExamQuestions);




// Exportar el Router
export default router;