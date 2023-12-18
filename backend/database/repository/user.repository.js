// userRepository.js

const db = require('../db');

class UserRepository {
  constructor() {
    this.tableName = 'users';
  }

  async getAllUsers() {
    const sql = `SELECT * FROM ${this.tableName}`;
    return db.query(sql);
  }

  async getUserById(userId) {
    const sql = `SELECT * FROM ${this.tableName} WHERE ID = ?`;
    return db.query(sql, [userId]);
  }

  async createUser(user) {
    const { email, password, type, active } = user;
    const sql = `INSERT INTO ${this.tableName} (email, password, type, active) VALUES (?, ?, ?, ?)`;
    const values = [email, password, type, active];
    return db.query(sql, values);
  }

  async updateUser(userId, updatedUser) {
    console.log("🚀 ~ file: user.repository.js:28 ~ UserRepository ~ updateUser ~ userId:", userId)
    const { email, password, type, active } = updatedUser;
    console.log("🚀 ~ file: user.repository.js:29 ~ UserRepository ~ updateUser ~ updatedUser:", updatedUser)
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
