import mongoose from 'mongoose';
import Topic from '../models/topics.js';
import Subject from '../models/subjects.js';


// Método de pureba del controlador topic  //TODO: Limpiar
export const testTopic = (req,res) => {
    return res.status(200).send({
        message: "Mensaje desde el controlador de Topics"
    });
};


// Método para crear un tópico
export const createTopic = async (req, res) => {
    try {

        // Obtener los datos de la petición
        let params = req.body;

        // Validar los datos obtenidos (que los datos obligatorios existan)
        if( !params.name || !params.subject_id){
            return res.status(400).json({
                status: "error",
                message: "Faltan datos por enviar."
            })
        }

        // Verificar si el tópico es válido ( si está en bd )
        const validSubject = await Subject.findById(params.subject_id);
        if(!validSubject){
            return res.status(400).json({
                status: "error",
                message: "El subjectId no corresponde a una materia en bd."
            })
        }


        // Change type of subject_id to be a ObjectId from mongoose
        const subject_objectId = new mongoose.Types.ObjectId(params.subject_id);//TODO: ver ese ObjectId deprecated
        params.subject_id = subject_objectId;


        // Crear el objeto del tópico con los datos  que validamos
        let topic_to_save = new Topic(params);

        // Control de topicos con el mismo nombre
        const existingTopic = await Topic.findOne({ name: topic_to_save.name});

        //Validar existingTopic
        if( existingTopic ){
            return res.status(409).send({
                status: "success",
                message: "Ya existe un tópico con ese nombre"
            });
        }

        // guardar el tópico en base de datos
        await topic_to_save.save();

        // Devolver el tópico agregado
        return res.status(201).json({
            status: "created",
            message: "Tópico creado exitosamente",
            topic_to_save
        })


    } catch (error) {
        console.log("Error al crear el tópico: ", error);
        return res.status(500).send({
            status: "error",
            message: "Error al crear el tópico"
        })
    }
};

// Método para obtener un listado de tópicos por materia
export const getTopicsBySubject = async (req,res) => {
    try {
        // Obtenermos id de la materia de la url
        const subjectId = req.params.subjectId;

        // Validamos que sí haya un id de materia en la url
        if(!subjectId){
            return res.status(400).send({
                status: "error",
                message: "Falta el id de la materia en la url"
            })
        }

        // buscamos los tópicos de esa materia
        const topics = await Topic.find({subject_id: subjectId}).populate('subject_id').select('-created_at -__v');

        console.log(topics)

        // validamos que sí hayan tópicos para esa materia
        if(!topics || topics.length <= 0){
            return res.status(404).send({
                status: "error",
                message: "No se encontraron tópicos para esa materia"
            })
        }

        // Devolvemos el listado de tópicos
        return res.status(200).json({
            status: "success",
            message: "Busqueda exitosa",
            topics: topics
        })

    } catch (error) {
        console.log("Error al obtener los tópicos: ", error);
        return res.status(500).send({
            status: "error",
            message: "Error al obtener los tópicos"
        })
    }
}

// Método para modificar un tópico TODO
export const updateTopic = async (req, res ) => {
    try {

        // Obtener id del topic que se va a actualizar desde la url
        let topicIdFromParams = req.params.id // recoge el id del topic desde la url

        if(!topicIdFromParams){
            return res.status(400).send({
                status: "error",
                message: "Debe proveer un id de tópico en la url para  poder hacer la modificación"
            });
        }


        // Obtener la información el tópico que se va a actualizar
        let topicToUpdate = req.body; // recoge los datos nuevos del tópico


        // Comprobamos si el tópico ya existe en bd
        const topicsMatched = await Topic.find({name: topicToUpdate.name }).exec();

        // Verificamos si ya hay materias con ese nombre (que debe ser único) en bd
        const isADuplicatedTopic = topicsMatched.some(topic => {
            return topic && topic._id.toString()!==topicIdFromParams;
        });

        if(isADuplicatedTopic){
            return res.status(200).send({
                status: "success",
                message: "El nombre del tópico coincide con uno en la bd."
            });
        }

        // Buscar y actualizar el tópico
        let topicUpdated = await Topic.findByIdAndUpdate(topicIdFromParams, topicToUpdate, { new: true} );
        if( !topicUpdated ){
            return res.status(400).send({
                status: "error",
                message: "Error al modificar el tópico. Es posible que el id no sea correcto."
            })
        }

        // Devolvemos la respuesta exitosa
        return res.status(200).json({
            status: "success",
            message: "Tópico actualizado exitosamente",
            subject: topicUpdated
        })
    } catch (error) {
        console.log("Error al modificar el tópico: ", error);
        return res.status(500).send({
            status: "error",
            message: "Error al modificar el tópico"
        })
    }
}

// Método para eliminar un tópico TODO
export const deleteTopic = async (req,res) => {
    try {

        // Obtener el ID del tópico
        const topicId = req.params.id;

        // Verificar si el id de la materia fue enviado
        if(!topicId){
            return res.status(400).send({
                status: "error",
                message: "Debe proveer un id del tópico para poder eliminar."
            });
        }

        // Buscar el tópico en la BD por Id y eliminamos
        const topicDeleted = await Topic.findOneAndDelete({_id: topicId});

        // Verificar si existe el tópico en la BD y si se eliminó de la BD
        if(!topicDeleted){
            return res.status(404).send({
                status: "error",
                message: "No se ha podido eliminar el tópico."
            });
        }


        // Devolvemos respuesta exitosa
        return res.status(200).json({
            status: "success",
            message: "Tópico eliminado con éxito.",
            subject: topicDeleted
        });
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error al eliminar el tópico"
        });
    }
};