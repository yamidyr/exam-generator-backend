
import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ExamQuestionsSchema = Schema ({
    exam_id: {
        type: Schema.ObjectId,
        ref: "Exam", // TODO: Hay que ponerlo único para cada question_id
        required: true
    },
    question_id: {
        type: Schema.ObjectId,
        ref: "Question", // TODO: Hay que ponerlo único para cada exam_id
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Configurar el plugin de paginación de Mongo
ExamQuestionsSchema.plugin(mongoosePaginate);

export default model("ExamQuestions", ExamQuestionsSchema, "exam_questions");