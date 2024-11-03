
// Importar la clave secreta

import jwt from 'jwt-simple';
import moment from 'moment';
import { secret } from '../services/jwt.js';


// Método de autenticación
export const ensureAuth = (req, res, next) => {

    // Comprobar si llega la cabecera de autenticación
    if(!req.headers.authorization){
        return res.status(403).send({
            status: "error",
            message: "La petición no tiene la cabecera de autenticación"
        })
    }
    // Limpiar el token y quitar comillas si las hay
    const token = req.headers.authorization.replace(/['"]+/g,'').replace("Bearer ", "");

    try {
        // Decodificar el token
        let payload = jwt.decode(token, secret);

        // Comprobar si el token ha expirado ( si la fecha de expiracióin es más antigua que la fecha actual)
        if(payload.exp <= moment.unix()){
            return res.status(401).send({
                status: "error",
                message: "El token ha expirado"
            });
        }

        // Agregar datos del usuario a la request
        req.user = payload;

    } catch (error) {
        return res.status(404).send({
            status: "error",
            message: "El token no es válido"
        });
    }

    // Paso a ejecución al siguiente método
    next();
}






// Decodificar el token


// Agregar datos del usuario a la request


// Paso a ejecución