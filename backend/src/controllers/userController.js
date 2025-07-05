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
    const { name, email, celphone } = req.body;
    if (!name || !email || !celphone) {
        return res.status(400).send("Name, email, and celphone are required");
    }

    try {
        const newUser = await User.create({ name, email, celphone });
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).send("Email already registered");
        }
        res.status(500).send("Error creating user");
    }
};

exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const { name, email, celphone } = req.body;
    if (!name || !email || !celphone) {
        return res.status(400).send("Name, email, and celphone are required");
    }
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        await user.update({ name, email, celphone });
        res.json({ message: "User updated successfully" });
    } catch (error) {
        console.error("Error updating user:", error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).send("Email already registered");
        }
        res.status(500).send("Error updating user");
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