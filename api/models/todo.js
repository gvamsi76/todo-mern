const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            require: false
        },
        completed: {
            type: Boolean,
            require: false
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
)

const Todo = mongoose.model('Todo', postSchema);
module.exports = Todo;