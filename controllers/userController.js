import User from '../models/users.js';
import bcrypt from 'bcrypt';


// Método de pureba del controlador user  //TODO: Limpiar
export const testUser = (req,res) => {
    return res.status(200).send({
        message: "Mensaje desde el controlador de Usuarios"
    });
};

