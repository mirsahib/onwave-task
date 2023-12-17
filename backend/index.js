// index.js
const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const User = require("./model/User"); // Path to your User model

const app = express();
const port = process.env.SERVER_PORT || 3001;

// Initialize Sequelize
const sequelize = new Sequelize({
    ...require("./sequelize.config.js").development,
});
//register models
User(sequelize, DataTypes);
// Sync the database (create tables if they don't exist)
sequelize
    .sync({ force: false }) // Set force to true to drop and recreate tables on each restart
    .then(() => {
        console.log("Database synced successfully");
    })
    .catch((error) => {
        console.error("Error syncing database:", error);
    });

app.get("/", (req, res) => {
    console.log("process", process.env.SERVER_PORT);
    res.send("Hello, Node.js Server!");
});
app.get("/query", (req, res) => {
    // Example query using the database module
    pool.query("SELECT * FROM users", (error, results, fields) => {
        if (error) {
            console.error("Error executing query:", error);
            return res.status(500).send("Internal Server Error");
        }

        // Process the results
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

module.exports = { app, sequelize };
