import { Router } from "express";
import { testTopic } from "../controllers/topicController.js";




const router = Router();

// Definir las rutas para topic
router.get('/test-topic', testTopic );




// Exportar el Router
export default router;