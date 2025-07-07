const User = require("../models/userModel");

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error("Error getting users:", error);
        res.status(500).send("Error getting users");
    }
};

exports.getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.json(user);
    } catch (error) {
        console.error("Error getting user:", error);
        res.status(500).send("Error getting user");
    }
};

exports.createUser = async (req, res) => {
    try {
        const { name, email, celphone } = req.body;
        const user = await User.create({ name, email, celphone });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { name, email, celphone } = req.body;
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
        user.name = name;
        user.email = email;
        user.celphone = celphone;
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        await user.destroy();
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send("Error deleting user");
    }
};