const express = require('express');
const router = express.Router();
const { CreateTodo, deleteTodo, getTodo, updateTodo, getAllTodos } = require('../controller/todo');
const authMiddleware= require("../middleware/authMiddleware")

router.post('/Save',authMiddleware,  CreateTodo);
// router.post('/update/:id', authMiddleware, updateTodo);
router.post('/GetAll', authMiddleware, getAllTodos);
router.get('/Get/:id',  getTodo);
router.delete('/Delete/:id',  deleteTodo);



module.exports = router;
