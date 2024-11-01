import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const UserSchema = Schema ({
    name: {
        type: String,
        required: true
    },
    role: {
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
UserSchema.plugin(mongoosePaginate);

export default model("User", UserSchema, "users");