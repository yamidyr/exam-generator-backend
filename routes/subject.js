import { Router } from "express";
import { testSubject } from "../controllers/subjectController.js";




const router = Router();

// Definir las rutas para subject
router.get('/test-subject', testSubject );




// Exportar el Router
export default router;