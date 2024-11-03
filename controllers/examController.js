import User from '../models/exams.js';
import bcrypt from 'bcrypt';


// Método de pureba del controlador exam //TODO: Limpiar
export const testExam = (req,res) => {
    return res.status(200).send({
        message: "Mensaje desde el controlador de Exams"
    });
};
