
import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const QuestionsSchema = Schema ({
    type: {
        type: String,
        required: true
    },
    difficulty: {
        type: Number,
        default: 2
    },
    term :{
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    topic_id :{
        type: Schema.ObjectId,
        ref: "Topic",
        required: true
    },
    subject_id :{
        type: Schema.ObjectId,
        ref: "Subject",
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        default: "revisión pendiente"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Configurar el plugin de paginación de Mongo
QuestionsSchema.plugin(mongoosePaginate);

export default model("Question", QuestionsSchema, "question");