// Importar dependencias (configurar en package.json)
import express from "express";
import dotenv from "dotenv";
import connection from "./database/connection.js";
import cors from "cors";
import bodyParser from "body-parser";
import UserRoutes from "./routes/user.js";
import SubjectRoutes from "./routes/subject.js";
import TopicRoutes from "./routes/topic.js";
import ExamRoutes from "./routes/exam.js";
import QuestionRoutes from "./routes/question.js";
import ExamQuestionsRoutes from "./routes/examQuestions.js"

// Configurar el dotenv para usar variables de entorno
dotenv.config();

// Mensaje de Bienvenida para verificar que  ejecutó la API de Node
console.log("API Node en ejecución");

// Usar la conexión a la Base de Datos
connection();

// Crear el servidor node
const app = express();
const puerto =  process.env.PORT || 3900;

// Configurar cors para que acepte peticiones del frontend
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// Decodificar los datos desde los formularios para convertirlos en objetos de JavaStcript
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar rutas del aplicativo ( módulos )
app.use('/api/user', UserRoutes);
app.use('/api/subject', SubjectRoutes);
app.use('/api/topic', TopicRoutes);
app.use('/api/exam', ExamRoutes);
app.use('/api/question', QuestionRoutes);
app.use('/api/exam-questions', ExamQuestionsRoutes)

// Configurar el servidor de Node
app.listen(puerto, () => {
    console.log("Servidor de Node ejecutándose en el puerto", puerto);
})

export default app;