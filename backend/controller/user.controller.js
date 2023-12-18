const userRepository = require("../database/repository/user.repository");

const create = async (req, res) => {
    try {
        const newUser = req.body;
        await userRepository.createUser(newUser);
        res.status(201).send("User created successfully");
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Internal Server Error");
    }
};
/**
 * Load user and append to req.
 */
const userByID = async (req, res, next, id) => {
    console.log("🚀 ~ file: user.controller.js:17 ~ userByID ~ id:", id)
    try {
        const user = await userRepository.getUserById(id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        req.profile = user[0];
        next();
    } catch (error) {
        console.error("Error finding user:", error);
        res.status(500).send("Internal Server Error");
    }
};

const read = async (req, res) => {
    res.json(req.profile);
};

const list = async (req, res) => {
    try {
        const users = await userRepository.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Internal Server Error");
    }
};

const update = async (req, res) => {
    try {
        const updatedUser = req.body;        
        await userRepository.updateUser(req.profile.ID, updatedUser);
        res.status(200).send("User updated successfully");
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Internal Server Error");
    }
};

const remove = async (req, res) => {
    try {
        await userRepository.deleteUser(req.profile.ID);
        res.status(200).send("User deleted successfully");
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    list,
    create,
    read,
    update,
    remove,
    userByID,
};
