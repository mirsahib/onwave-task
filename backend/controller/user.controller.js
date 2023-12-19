const userRepository = require("../database/repository/user.repository");
const path = require("path");
const fs = require('fs');

const create = async (req, res) => {
    try {
        const newUser = req.body;
        const userId = await userRepository.createUser({
            ...newUser,
            type: "user",
            active: true,
        });

        // Send the user ID as a response
        res.status(201).json({ userId, message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Internal Server Error");
    }
};

/**
 * Load user and append to req.
 */
const userByID = async (req, res, next, id) => {
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

const uploadImage = async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log(
            "🚀 ~ file: user.controller.js:72 ~ uploadImage ~ userId:",
            userId
        );

        if (!req.file) {
            return res.status(400).send("No file uploaded.");
        }
        console.log(
            "🚀 ~ file: user.controller.js:69 ~ uploadImage ~ req:",
            req.file
        );

        const fileName = req.file.filename;
        console.log(
            "🚀 ~ file: user.controller.js:78 ~ uploadImage ~ fileName:",
            fileName
        );

        // Update the user's profile image in the database
        await userRepository.updateProfileImage(userId, fileName);

        res.status(200).json({
            message: "File uploaded successfully",
            fileName,
        });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).send("Internal Server Error");
    }
};

const getImages = async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log("🚀 ~ file: user.controller.js:110 ~ getImages ~ userId:", userId)

        const imageNames = await userRepository.getImageFilename(userId);

        if (!imageNames || imageNames.length === 0) {
            return res.status(404).send("No images found");
        }

        const firstImageName = imageNames[0].profile_img;
        console.log("🚀 ~ file: user.controller.js:121 ~ getImages ~ firstImageName:", firstImageName)
        const imagePath = path.join(__dirname, '..', 'uploads', firstImageName);
        
        const image = fs.readFileSync(imagePath);
        res.setHeader('Content-Type', 'image/jpeg'); 
        // Send the image file
        res.end(image);
    } catch (error) {
        console.error("Error fetching images:", error);
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
    uploadImage,
    getImages
};
