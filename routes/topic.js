import { Router } from "express";
import { createTopic, deleteTopic, getTopicsBySubject, testTopic, updateTopic } from "../controllers/topicController.js";




const router = Router();

// Definir las rutas para topic
router.get('/test-topic', testTopic );
router.post('/create-topic',createTopic);
router.get('/topics-by-subject/:subjectId?',getTopicsBySubject);
router.put('/update-topic/:id?',updateTopic);
router.delete('/delete-topic/:id?', deleteTopic);




// Exportar el Router
export default router;