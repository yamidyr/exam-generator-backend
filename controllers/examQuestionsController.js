import User from '../models/exam_questions.js';
import bcrypt from 'bcrypt';


// Método de pureba del controlador examQuestions  //TODO: Limpiar
export const testExamQuestions = (req,res) => {
    return res.status(200).send({
        message: "Mensaje desde el controlador de ExamQuestions"
    });
};
