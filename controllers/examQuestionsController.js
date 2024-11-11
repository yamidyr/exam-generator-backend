import ExamQuestions from '../models/exam_questions.js';
import mongoose from 'mongoose';


// Método de pureba del controlador exam //TODO: Limpiar
export const testExamQuestions = (req,res) => {
    return res.status(200).send({
        message: "Mensaje desde el controlador de ExamsQuestions"
    });
};

// Método para guardar varias preguntas de un examen
export const createManyExamQuestions = async (req, res) => {
    try {
        // Obtener los datos de la petición. Los ids de las preguntas vienen en un array
        let params = req.body;

        // Validar los datos obtenidos (que los datos obligatorios existan)
        if( !params.exam_id || !params.array_question_ids || params.array_question_ids.length === 0){
            return res.status(400).json({
                status: "error",
                message: "Faltan datos por enviar."
            })
        }

        // validar que el id de examen sea valido y los ids de las preguntas también? TODO: pensarlo

        // Crear el objectsId del examen para mongo
        const examObjectId = new mongoose.Types.ObjectId(params.exam_id);

        // Crear el listado de objetos ExamQuestions que serán guardados en bd
        let examQuestionsList = [];
        for(let i=0; i< params.array_question_ids.length; i++){
            // crear el objectId de la pregunta
            let questionObjectId = new mongoose.Types.ObjectId(params.array_question_ids[i].question_id);
            // creamos el ExamQuestion para esta pregunta y lo añadimos a examQuestionsList
            let examQuestionsObject = new ExamQuestions({
                exam_id: examObjectId,
                question_id: questionObjectId
            });
            examQuestionsList.push(examQuestionsObject);
        }

        // Guardamos los objetos de examQuestionsList en bd
        const examQuestionsSaved = await ExamQuestions.insertMany(examQuestionsList);


        // Validamos que se hayan guardado:
        if(!examQuestionsSaved){
                return res.status(500).send({
                status: "error",
                message: "Hubo un problema al guardas las preguntas del examen"
            });
        }


        // Devolver la pregunta creada
        return res.status(201).json({
            status: "created",
            message: "Preguntas del examen creadas con éxito.",
            examQuestionsSaved
        })


    } catch (error) {
        console.log("Error al crear las preguntas del examen: ", error);
        return res.status(500).send({
            status: "error",
            message: `Error al crear las preguntas del examen: ${error}:   ${error.reason}`
        })
    }
};