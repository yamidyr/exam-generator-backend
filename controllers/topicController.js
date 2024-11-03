import User from '../models/topics.js';
import bcrypt from 'bcrypt';


// Método de pureba del controlador topic  //TODO: Limpiar
export const testTopic = (req,res) => {
    return res.status(200).send({
        message: "Mensaje desde el controlador de Topics"
    });
};


// Método para crear un tópico TODO

// Método para obtener un listado de tópicos por materia TODO

// Método para modificar un tópico TODO

// Método para eliminar un tópico TODO