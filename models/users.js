import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const UserSchema = Schema ({
    name: {
        type: String,
        required: true
    },
    id_number:{
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "docente"
    },
    subject_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Configurar el plugin de paginación de Mongo
UserSchema.plugin(mongoosePaginate);

export default model("User", UserSchema, "users");