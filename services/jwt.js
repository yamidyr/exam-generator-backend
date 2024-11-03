import jwt from 'jwt-simple';
import moment from 'moment';
import dotenv from 'dotenv'

// Cargar varables de entorno desde el archivo .env
dotenv.config();

// Clave secreta
const secret = process.env.SECRET_KEY;

// Método para generar tokens
// Unix: segundos transccurridos desde el 1 de enero de 1970
const createToken = (user) => {
    const payload = {
        userId: user._id,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(7,'days').unix()
    }

    // Devolver el jwt token codificado
    return jwt.encode(payload, secret);
};

export {
    secret,
    createToken
}