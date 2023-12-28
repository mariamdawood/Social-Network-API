// Import mongoose for MongoDB
const mongoose = require('mongoose');

// Load environment variables
require('dotenv').config();

// Connect to MongoDB using provided URI or default local URI
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-network-api');

// Export the mongoose connection
module.exports = mongoose.connection;