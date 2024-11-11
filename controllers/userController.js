//import latex from 'node-latex';
import User from '../models/users.js';
import bcrypt from 'bcrypt';
import { createToken } from '../services/jwt.js';


// Método de pureba del controlador user  //TODO: Limpiar
export const testUser = (req,res) => {
    return res.status(200).send({
        message: "Mensaje desde el controlador de Usuarios"
    });
};

// Método de registro de usuarios
export const register = async (req, res) => {
    try {
        // Obtener los datos de la petición
        let params = req.body;

        // Validar los datos obtenidos (que los datos obligatorios existan)
        if( !params.name || !params.subject_name || !params.id_number || !params.password){
            return res.status(400).json({
                status: "error",
                message: "Faltan datos por enviar"
            })
        }

        // Crear el objeto del usuario con los datos  que validamos
        let user_to_save = new User(params);

        // Control de usuarios duplicados
        const existingUser = await User.findOne({ id_number: user_to_save.id_number});

        //Validar existingUser
        if( existingUser ){
            return res.status(409).send({
                status: "success",
                message: "Ya existe un usuario registrado con ese documento de identidad."
            });
        }

        // Cifrar la contraseña
        // Genera los saltos para encriptar
        const salt = await bcrypt.genSalt(10);

        // Encripta la contraseña y guarda en hashedPassword
        const hashedPassword = await bcrypt.hash(user_to_save.password,salt);

        //Asignar la contraseña encriptada al objeto del usuario
        user_to_save.password = hashedPassword;

        // guardar el usuario en base de datos
        await user_to_save.save();

        // Devolver el usuario registrado
        return res.status(201).json({
            status: "created",
            message: "Registro de usuario exitoso",
            user_to_save
        })


    } catch (error) {
        console.log("Error en el registro de usuario: ", error);
        return res.status(500).send({
            status: "error",
            message: "Error en el registro de usuario"
        })
    }
};

// Método de Login ( Usar JWT )
export const login = async (req,res) => {
    try {

        // Obtener los parámetros del body (enviados en la petición)
        let params = req.body;

        // Validar que sí recibimos el documento de identidad y el password
        if ( !params.id_number || !params.password){
            return res.status(400).send({
                status: "error",
                message: "Faltan datos por enviar"
            });
        }

        // Buscar en la BD si existe el documento de identidad registrado
        const userBD = await User.findOne({
            id_number: params.id_number
        });

        // Si no existe el documento buscado
        if(!userBD){
            return res.status(404).send({
                status: "error",
                message: "Documento no registrado"
            });
        }

        // Comprobar la contraseña
        const validPassword = await bcrypt.compare(params.password, userBD.password);

        // Si la contraseña es incorrecta (false)
        if(!validPassword){
            return res.status(401).send({
                status: "error",
                message: "Contraseña incorrecta"
            })
        }

        // Generar el token de autenticación (JWT)
        const token = createToken(userBD);


        // Devolver respuesta de login exitoso
        return res.status(200).json({
            status: "success",
            message: "Autenticación exitosa",
            token,
            userBD: {
                id: userBD._id,
                name: userBD.name,
                role: userBD.role,
                subject_name: userBD.subject_name
            }
        })
    } catch (error) {
        console.log("Error en la autenticación del usuario: ", error);
        return res.status(500).send({
            status: "error",
            message: "Error en la autenticación del usuario"
    })
    }
};

// Método para obtener info de un usuario TODO
export const getUser = async (req, res ) => {
    try {
        // Obtener el ID del usuario desde el token de autenticación
        const userId = req.user.userId;

        // Verificar si el ID del usuario autenticado está disponible
        if(!req.user || !req.user.userId){
            return res.status(401).send({
                status: "success",
                message: "Usuario no autenticado"
            })
        }

        // Buscar el usuario en la BD y excluimos los datos que no queremos mostrar
        const userFromDb = await User.findById(userId).select('-password -__v');

        // Verificar si el usuario buscado no existe
        if(!userFromDb){
            return res.status(404).send({
                status: "success",
                message: "Usuario no encontrado"
            });
        }

        // Devolver la información del usuario solicitado
        return res.status(200).json({
            status: "success",
            user: userFromDb
        })


    } catch (error) {
        console.log("Error al obtener el perfil del usuario: "  , error);
        return res.status(500).send({
            status: "error",
            message: "Error al obtener el perfil del usuario"
        })
    }
}

// Método para obtener un listado de usuarios TODO

// Método para actualizar los datos de un usuario TODO

// Método para subir foto de usuario TODO

// Método para mostrar imagen de usuario TODO

