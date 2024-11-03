import User from '../models/subjects.js';
import bcrypt from 'bcrypt';


// Método de pureba del controlador subject  //TODO: Limpiar
export const testSubject = (req,res) => {
    return res.status(200).send({
        message: "Mensaje desde el controlador de Subjects"
    });
};
