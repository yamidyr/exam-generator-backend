import User from '../models/questions.js';
import bcrypt from 'bcrypt';


// Método de pureba del controlador question  //TODO: Limpiar
export const testQuestion = (req,res) => {
    return res.status(200).send({
        message: "Mensaje desde el controlador de Question"
    });
};

// Método para crear pregunta TODO

// Método para obtener una pregunta TODO

// Método para obtener un listado de preguntas mediante filtro TODO

// Método para modificar una pregunta TODO

// Método para eliminar una pregunta TODO

// Método para eliminar un listado de preguntas TODO

// Método para mostrar una pregunta en pdf TODO
