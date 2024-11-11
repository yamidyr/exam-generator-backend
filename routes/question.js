import { Router } from "express";
import { createQuestion, getAllQuestions, getQuestion, testQuestion } from "../controllers/questionController.js";
import { ensureAuth } from "../middlewares/auth.js";




const router = Router();

// Definir las rutas para question
router.get('/test-question', testQuestion );
router.post('/create-question',ensureAuth, createQuestion);
router.get('/get-question/:id?',ensureAuth,getQuestion);
router.get('/get-all-questions/:page?/:limit?',ensureAuth,getAllQuestions);




// Exportar el Router
export default router;