import User from '../models/exams.js';
import bcrypt from 'bcrypt';


// Método de pureba del controlador exam //TODO: Limpiar
export const testExam = (req,res) => {
    return res.status(200).send({
        message: "Mensaje desde el controlador de Exams"
    });
};

// Método para crear un examen TODO
    // Deben afectarse las tablas exams y exam_questions

// Método para obtener un examen TODO

// Método para obtener un listado de exámenes mediante filtro TODO

// Método para modificar un examen TODO
    // Deben afectarse las tablas exams, exam_questions

// Método para eliminar un examen TODO
    // Deben afectarse las tablas exams, exam_questions

// Método para eliminar un listado de examenes TODO
    // Deben afectarse las tablas exams, exam_questions

// Método para mostrar un examen en pdf TODO
