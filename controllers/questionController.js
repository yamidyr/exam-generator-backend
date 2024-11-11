import mongoose, { mongo } from 'mongoose';
import Question from '../models/questions.js';
import Topic from '../models/topics.js';


// Método de pureba del controlador question  //TODO: Limpiar
export const testQuestion = (req,res) => {
    return res.status(200).send({
        message: "Mensaje desde el controlador de Question"
    });
};

// Método para crear pregunta
export const createQuestion = async (req, res) => {
    try {
        // Obtener los datos de la petición
        let params = req.body;

        // Obtener el usuario que crea la pregunta desde el token
        let userId = req.user.userId;

        // Validar los datos obtenidos (que los datos obligatorios existan)
        if( !params.type || !params.term || !params.content|| !params.topic_id || !params.subject_id){
            return res.status(400).json({
                status: "error",
                message: "Faltan datos por enviar"
            })
        }

        // Validamos que el topic sea válido y que sea de alguna materia
        const questionTopic = await Topic.findById(params.topic_id).select('subject_id');
        if( !questionTopic || questionTopic.subject_id.toString() !== params.subject_id){
            return res.status(400).send({
                status: "error",
                message: "El tópico no existe en bd o no corresponde con la materia"
            })
        }


        // Crear los correspondientes objectsId para mongo
        // para el userId:
        const userObjectId = new mongoose.Types.ObjectId(userId);
        // para el topic:
        const topicObjectId = new mongoose.Types.ObjectId(params.topic_id);
        // para el subject:
        const subjectObjectId = new mongoose.Types.ObjectId(params.subject_id);

        // Cambiamos los ids por objectIds en los parámetros para poder ser creada la pregunta
        params.user_id = userObjectId;
        params.topic_id = topicObjectId;
        params.subject_id = subjectObjectId;


        // Crear el objeto de la pregunta con los datos  que validamos
        let question_to_save = new Question(params);

        // guardar la pregunta en bd
        await question_to_save.save();

        // Devolver la pregunta creada
        return res.status(201).json({
            status: "created",
            message: "Pregunta creada con éxito.",
            question_to_save
        })


    } catch (error) {
        console.log("Error al crear la pregunta: ", error);
        return res.status(500).send({
            status: "error",
            message: "Error al crear la pregunta"
        })
    }
};

// Método para obtener una pregunta
export const getQuestion = async (req, res ) => {
    try {

        // Obtener el id de la pregunta desde la url
        const questionId = req.params.id;

        // Validar que llgue el id de la pregunta en la url
        if(!questionId){
            return res.status(400).send({
                status: "error",
                message: "Falta el id de la pregunta en la url."
            })
        }

        // Buscamos la pregunta en la BD y excluimos los datos que no queremos mostrar
        const questionFound = await Question.findById(questionId).select(' -__v');

        // Verificar si la pregunta buscada existe
        if(!questionFound){
            return res.status(404).send({
                status: "success",
                message: "Pregunta no encontrada"
            });
        }

        // Devolver la información de la pregunta
        return res.status(200).json({
            status: "success",
            question: questionFound
        })


    } catch (error) {
        console.log("Error al obtener la pregunta: "  , error);
        return res.status(500).send({
            status: "error",
            message: `Error al obtener la pregunta: ${error}:   ${error.reason}`
        })
    }
}

// Método para traer todas las preguntas
export const getAllQuestions = async (req,res) => {
    try {
        // Gestionar la paginación
        // 1. Configurar la página actual
        let page = req.params.page ? parseInt(req.params.page, 10) : 1;

        // 2. Configurar los items por página a mostrar
        let itemsPerPage = req.query.limit ? parseInt(req.query.limit, 10) : 4;

        // Realizar consulta paginada
        const options = {
            page: page,
            limit: itemsPerPage,
            select: '-__v'
        };
        const questions = await Question.paginate({}, options);

        // Si no existen preguntas en la bd disponibles
        if(!questions || questions.docs.length === 0){
            return res.status(404).send({
                status: "error",
                message: "No existen preguntas en la base de datos"
            });
        }

        // Devolver las preguntas paginadas
        return res.status(200).json({
            status: "success",
            questions: questions.docs,
            totalDocs: questions.totalDocs,
            totalPages: questions.totalPages,
            cancelIdleCallbackCurrentPage: questions.page
        })

    } catch (error) {
        console.log("Error al obtener las preguntas: ", error);
        return res.status(500).send({
            status: "error",
            message: `Error al obtener las preguntas: ${error}:   ${error.reason}`
        })
    }
}

// Método para obtener un listado de preguntas mediante filtro TODO

// Método para modificar una pregunta TODO

// Método para eliminar una pregunta TODO

// Método para eliminar un listado de preguntas TODO

// Método para mostrar una pregunta en pdf TODO
