import { Router } from "express";
import { createSubject, deleteSubject, getSubjects, testSubject, updateSubject } from "../controllers/subjectController.js";
import { ensureAuth } from "../middlewares/auth.js";



const router = Router();

// Definir las rutas para subject
router.get('/test-subject', testSubject );
router.post('/create-subject',ensureAuth,createSubject);
router.get('/get-all-subjects',getSubjects);
router.put('/update-subject/:id?',ensureAuth,updateSubject);
router.delete('/delete-subject/:id?',ensureAuth,deleteSubject);




// Exportar el Router
export default router;