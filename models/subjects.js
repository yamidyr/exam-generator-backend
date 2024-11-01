
import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const SubjectSchema = Schema ({
    name: {
        type: String,
        required: true
    },
    displayed_name: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Configurar el plugin de paginación de Mongo
SubjectSchema.plugin(mongoosePaginate);

export default model("Subject", SubjectSchema, "subjects");