import { Router } from "express";
import { createExam, downloadGeneratedExam, generateExam, getAllExams, getExam, testExam } from "../controllers/examController.js";
import { ensureAuth } from "../middlewares/auth.js";




const router = Router();

// Definir las rutas para exam
router.get('/test-exam', testExam);
router.post('/create-exam',ensureAuth,createExam);
router.get('/get-exam/:id?',ensureAuth,getExam);
router.get('/get-all-exams/:page?/:limit?',ensureAuth,getAllExams);
router.post('/generate-exam',generateExam);
router.get('/download-exam',downloadGeneratedExam);




// Exportar el Router
export default router;