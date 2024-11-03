import User from '../models/users.js';
import bcrypt from 'bcrypt';


// Método de pureba del controlador user  //TODO: Limpiar
export const testUser = (req,res) => {
    return res.status(200).send({
        message: "Mensaje desde el controlador de Usuarios"
    });
};

// Método de registro de usuarios TODO

// Método de Login ( Usar JWT ) TODO

// Método para obtener info de un usuario TODO

// Método para obtener un listado de usuarios TODO

// Método para actualizar los datos de un usuario TODO

// Método para subir foto de usuario TODO

// Método para mostrar imagen de usuario TODO

