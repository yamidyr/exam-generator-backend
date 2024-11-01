
import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const TopicSchema = Schema ({
    name: {
        type: String,
        required: true
    },
    subject_id: {
        type: Schema.ObjectId,
        ref: "Subject",
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Configurar el plugin de paginación de Mongo
TopicSchema.plugin(mongoosePaginate);

export default model("Topic", TopicSchema, "topic");