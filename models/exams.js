
import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ExamSchema = Schema ({
    subject_id:{
        type: Schema.ObjectId,
        ref: "Subject",
        required: true
    },
    user_id:{
        type: Schema.ObjectId,
        ref: "User",
        required: true
    },
    term:{
        type: Number
    },
    instructions: {
        type: String,
        default: "Instrucciones."
    },
    description: {
        type: String,
        default: "Descripción."
    },
    number_of_questions: {
        type: Number,
        default: 0
    },
    aplication_date: {
        type: Date,
        default:Date.now
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Configurar el plugin de paginación de Mongo
ExamSchema.plugin(mongoosePaginate);

export default model("Exam", ExamSchema, "exams");