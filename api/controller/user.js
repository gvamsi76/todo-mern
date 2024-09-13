const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
require('dotenv').config();

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = new User({ name, email, password });
       let data = await user.save();
        res.status(200).json({
            success: true,
            user: { id: user._id, fullName: user.name, email: user.email },
            message: 'User created successfully!',
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '40h',
        });

        res.status(200).json({
            token, user: { id: user._id, fullName: user.name, email: user.email },
            message: 'User logedin successfully!',
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getUsers = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const skip = (page - 1) * limit;

        const users = await User.find()
            .select('-password').skip(skip)
            .limit(parseInt(limit));
        const totalUsers = await User.countDocuments();

        res.status(200).json({

            users,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalUsers / limit),
            totalUsers

        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password; 
        res.status(200).json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    const { id, name, email } = req.body;

    const schema = Joi.object({
        name: Joi.string().optional(),
        email: Joi.string().email().optional(),
    });

    const { error } = schema.validate({ name, email });
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (name) user.name = name;
        if (email) user.email = email;

        await user.save();
        res.status(200).json({ message: 'User updated', user: { id: user._id, fullName: `${user.firstName} ${user.lastName}`, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        console.log(user, "user")
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.deleteOne();
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
};