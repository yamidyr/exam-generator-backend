import Subject from '../models/subjects.js';
import bcrypt from 'bcrypt';


// Método de pureba del controlador subject  //TODO: Limpiar
export const testSubject = (req,res) => {
    return res.status(200).send({
        message: "Mensaje desde el controlador de Subjects"
    });
};

// Subject = Materia

// Método para crear un Subject // solo admin puede hacerlo
export const createSubject = async (req, res) => {
    try {

        // Obtener rol del usuario desde el token de autenticación
        let userRole = req.user.role;

        // Validar si el usuario autenticado tiene permisos para esta operación:
        // solo usuario con role = admin son permitidos
        if( userRole != "admin"){
            return res.status(403).send({
                status: "error",
                message: "Esta operación no está permitida para este usuario."
            });
        }

        // Obtener los datos de la petición
        let params = req.body;

        // Validar los datos obtenidos (que los datos obligatorios existan)
        if( !params.name || !params.displayed_name){
            return res.status(400).json({
                status: "error",
                message: "Se debe enviar name y displayed_name"
            })
        }

        // Se cambia el name a lowerCase y sin acentos: TODO: ?

        // Crear el objeto del usuario con los datos  que validamos
        let subject_to_save = new Subject(params);

        // Control de materias duplicadas
        const existingSubject = await Subject.findOne({ name: subject_to_save.name.toLowerCase()});

        //Validar existingUser
        if( existingSubject ){
            return res.status(409).send({
                status: "success",
                message: "Ya existe una materia registrada con ese nombre identificador."
            });
        }

        // guardar la materia en base de datos
        await subject_to_save.save();

        // Devolver la materia agregada
        return res.status(201).json({
            status: "created",
            message: "Materia creada exitosamente",
            subject_to_save
        })


    } catch (error) {
        console.log("Error al crear materia: ", error);
        return res.status(500).send({
            status: "error",
            message: "Error al crear materia"
        })
    }
};

// Método para obtener el listado de Subjects
export const getSubjects = async (req,res) => {
    try {

        const subjects = await Subject.find().select('-created_at -__v');

        // Si no existen usuarios en la BD disponibles
        if(!subjects){
            return res.status(404).send({
                status: "error",
                message: "No existen materias disponibles"
            });
        }

        // Devolver los usuarios paginados
        return res.status(200).json({
            status: "success",
            subjects: subjects
        })

    } catch (error) {
        console.log("Error al obtener las materias: ", error);
        return res.status(500).send({
            status: "error",
            message: "Error al obtener las materias"
        })
    }
}

// Método para editar un Subject // solo admin puede hacerlo
export const updateSubject = async (req, res ) => {
    try {

        // Obtener rol del usuario desde el token de autenticación
        let userRole = req.user.role;

        // Validar si el usuario autenticado tiene permisos para esta operación:
        // solo usuario con role = admin son permitidos
        if( userRole != "admin"){
            return res.status(403).send({
                status: "error",
                message: "Esta operación no está permitida para este usuario."
            });
        }

        // Obtener id del subject que se va a actualizar desde la url
        let subjectIdFromParams = req.params.id // recoge el id del subject desde la url

        if(!subjectIdFromParams){
            return res.status(400).send({
                status: "error",
                message: "Debe proveer un id de materia para  poder hacer la modificación"
            });
        }


        // Obtener la información de la materia que se va a actualizar
        let subjectToUpdate = req.body; // recoge los datos nuevos del usuario desde el formulario


        // Comprobamos si la materia ya existe en la BD
        const subjectsMatched = await Subject.find({name: subjectToUpdate.name }).exec();

        // Verificamos si ya hay materias con ese nombre (que debe ser único) en bd
        const isADuplicatedSubject = subjectsMatched.some(subject => {
            return subject && subject._id.toString()!==subjectIdFromParams;
        });

        if(isADuplicatedSubject){
            return res.status(200).send({
                status: "succes",
                message: "El nombre identificador de la materia ya existe en bd"
            });
        }

        // Buscar y actualizar la materia en mongodb
        let subjectUpdated = await Subject.findByIdAndUpdate(subjectIdFromParams, subjectToUpdate, { new: true} );
        if( !subjectUpdated ){
            return res.status(400).send({
                status: "error",
                message: "Error al modificar la materia"
            })
        }

        // Devolvemos la respuesta exitosa
        return res.status(200).json({
            status: "success",
            message: "Materia actualizada exitosamente",
            subject: subjectUpdated
        })
    } catch (error) {
        console.log("Error al actualizar la materia: ", error);
        return res.status(500).send({
            status: "error",
            message: "Error al actualizar la materia"
        })
    }
}

// Método para eliminar un Subject // solo admin puede hacerlo
export const deleteSubject = async (req,res) => {
    try {

        // Obtener rol del usuario desde el token de autenticación
        let userRole = req.user.role;

        // Validar si el usuario autenticado tiene permisos para esta operación:
        // solo usuario con role = admin son permitidos
        if( userRole != "admin"){
            return res.status(403).send({
                status: "error",
                message: "Esta operación no está permitida para este usuario."
            });
        }


        // Obtener el ID de la materia
        const subjectId = req.params.id;

        // Verificar si el id de la materia fue enviado
        if(!subjectId){
            return res.status(400).send({
                status: "error",
                message: "Debe proveer un id de materia para  poder hacer la modificación"
            });
        }

        // Buscar la materia en la BD por Id y la eliminamos
        const subjectDeleted = await Subject.findOneAndDelete({_id: subjectId});

        // Verificar si existe la materia en la BD y si se eliminó de la BD
        if(!subjectDeleted){
            return res.status(404).send({
                status: "error",
                message: "No se ha podido eliminar la materia."
            });
        }


        // Devolvemos respuesta exitosa
        return res.status(200).json({
            status: "success",
            message: "Materia eliminada con éxito.",
            subject: subjectDeleted
        });
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error al eliminar la materia."
        });
    }
    };
