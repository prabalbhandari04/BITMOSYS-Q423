// Import the express module
const express = require('express');

// Create an instance of the express application
const app = express();

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, this is your Node.js server!');
});

// Set the port for the server to listen on
const port = process.env.PORT || 5000;

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
