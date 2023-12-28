// Import necessary packages and modules
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Define the port to listen on
const PORT = process.env.PORT || 3001;

// Create an instance of Express
const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use the defined routes
app.use(routes);

// Open a connection to the database
db.once('open', () => {
    // Start the server and listen on the specified port
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});