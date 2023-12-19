// userRepository.js

const db = require("../db");

class UserRepository {
    constructor() {
        this.tableName = "users";
    }

    async getAllUsers() {
        const sql = `SELECT * FROM ${this.tableName}`;
        return db.query(sql);
    }

    async getUserById(userId) {
        const sql = `SELECT * FROM ${this.tableName} WHERE ID = ?`;
        return db.query(sql, [userId]);
    }

    async getImageFilename(userId){
        const sql = `SELECT profile_img FROM ${this.tableName} WHERE ID = ?`;
        return db.query(sql, [userId]);
    }

    async createUser(user) {
        const { email, password, type, active } = user;
        const insertSql = `INSERT INTO ${this.tableName} (email, password, type, active) VALUES (?, ?, ?, ?)`;
        const selectLastIdSql = `SELECT LAST_INSERT_ID() AS userId`;

        try {
            // Execute the INSERT query to create the user
            await db.query(insertSql, [email, password, type, active]);

            // Execute a SELECT query to get the last inserted ID
            const result = await db.query(selectLastIdSql);

            // Extract the user ID from the result
            const userId = result[0].userId;

            // Return the user ID
            return userId;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error; // Propagate the error
        }
    }

    async updateProfileImage(userId, fileName) {
        const sql = `UPDATE ${this.tableName} SET profile_img = ? WHERE ID = ?`;
        const values = [fileName, userId];
        return db.query(sql, values);
    }


    async updateUser(userId, updatedUser) {
        console.log(
            "🚀 ~ file: user.repository.js:28 ~ UserRepository ~ updateUser ~ userId:",
            userId
        );
        const { email, password, type, active } = updatedUser;
        console.log(
            "🚀 ~ file: user.repository.js:29 ~ UserRepository ~ updateUser ~ updatedUser:",
            updatedUser
        );
        const sql = `UPDATE ${this.tableName} SET email = ?, password = ?, type = ?, active = ? WHERE ID = ?`;
        const values = [email, password, type, active, userId];
        return db.query(sql, values);
    }

    async deleteUser(userId) {
        const sql = `DELETE FROM ${this.tableName} WHERE ID = ?`;
        return db.query(sql, [userId]);
    }
}

module.exports = new UserRepository();
