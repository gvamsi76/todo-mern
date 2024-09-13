const Todo = require('../models/todo');
require('dotenv').config();

const CreateTodo = async (req, res) => {
    const {id, title, description, completed } = req.body;
    try {
        if (id) {
            const updatedTodo = await Todo.findByIdAndUpdate(
                id,
                { title, description, completed },
                { new: true, runValidators: true } 
            );

            if (!updatedTodo) {
                return res.status(404).json({ message: 'Todo not found' });
            }

            return res.status(200).json(updatedTodo); 
        } else {
            const newTodo = new Todo({
                title,
                description,
                completed,
            });
            await newTodo.save();
            return res.status(201).json(newTodo); 
        }
    } catch (error) {
        return res.status(400).json({ message: error.message }); 
    }
};
const getAllTodos = async (req, res) => {
    try {
        const UserPost = await Todo.find()
        res.status(200).json(UserPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getTodo = async (req, res) => {
    try {
        const user = await Todo.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTodo = async (req, res) => {
    const {  title, description,completed } = req.body;

    const todo = new Todo({
        title,
        description,
        completed
    });

    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        if (title) todo.title = title;
        if (description) todo.description = description;

        await todo.save();
        res.status(200).json({ message: 'Todo updated', user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const user = await Todo.findOne({ _id: req.params.id });
        console.log(user, "user")
        if (!user) {
            return res.status(404).json({ message: 'Todo  not found' });
        }
        await Todo.deleteOne();
        res.status(200).json({ message: 'Todo  deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    CreateTodo,
    updateTodo,
    getAllTodos,
    getTodo,
    deleteTodo,
};