import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: [true, "Please provide a todo"],

    },
    completed: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });

const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);

export default Todo;