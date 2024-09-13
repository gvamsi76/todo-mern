const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUsers, getUserById, updateUser, deleteUser } = require('../controller/user');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/getAll', authMiddleware, getUsers);
router.get('/:id', authMiddleware, getUserById);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);

module.exports = router;
