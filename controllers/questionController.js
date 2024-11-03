import User from '../models/questions.js';
import bcrypt from 'bcrypt';


// Método de pureba del controlador question  //TODO: Limpiar
export const testQuestion = (req,res) => {
    return res.status(200).send({
        message: "Mensaje desde el controlador de Question"
    });
};
