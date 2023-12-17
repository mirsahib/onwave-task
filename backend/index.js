// index.js
const express = require('express');

const app = express();
const port = process.env.SERVER_PORT||3001;

app.get('/', (req, res) => {
  console.log('process',process.env.SERVER_PORT);
  res.send('Hello, Node.js Server!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
