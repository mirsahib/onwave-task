const mysql = require("mysql2");

// Create a MySQL connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

// Function to execute SQL queries
function query(sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }

            connection.query(sql, values, (error, results) => {
                connection.release();

                if (error) {
                    reject(error);
                    return;
                }

                resolve(results);
            });
        });
    });
}

// Function to create the users table
async function createUsersTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        ID INT NOT NULL AUTO_INCREMENT,
        email VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
        password VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
        profile_img VARCHAR(255) CHARACTER SET 'utf8mb4',
        type VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
        active TINYINT DEFAULT 1,
        PRIMARY KEY (ID)
      )
    `;

    try {
        await query(createTableQuery);
        console.log("Users table created successfully!");
    } catch (error) {
        console.error("Error creating users table:", error);
    }
}


console.log("Database connection established!");

// Call the function to create the users table

createUsersTable();

module.exports = {
    query,
};
