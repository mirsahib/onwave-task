// index.js
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database/db"); // Adjust the path accordingly
const userRepository = require("./database/repository/user.repository");
const userRoutes = require("./routes/user.routes");
const app = express();
app.use(bodyParser.json());
const port = process.env.SERVER_PORT || 3001;


app.use('/', userRoutes);
app.get("/", (req, res) => {
    console.log("process", process.env.SERVER_PORT);
    res.send("Hello, Node.js Server!");
});

// app.get("/users", async (req, res) => {
//     try {
//         const users = await userRepository.getAllUsers();
//         res.json(users);
//     } catch (error) {
//         console.error("Error fetching users:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });

// app.post("/users", async (req, res) => {
//     try {
//         const newUser = req.body;
//         await userRepository.createUser(newUser);
//         res.status(201).send("User created successfully");
//     } catch (error) {
//         console.error("Error creating user:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
