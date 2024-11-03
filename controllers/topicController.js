import User from '../models/topics.js';
import bcrypt from 'bcrypt';


// Método de pureba del controlador topic  //TODO: Limpiar
export const testTopic = (req,res) => {
    return res.status(200).send({
        message: "Mensaje desde el controlador de Topics"
    });
};
