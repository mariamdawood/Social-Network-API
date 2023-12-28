// Import the express Router
const router = require('express').Router();

// Import user and thought routes
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// Use user and thought routes under '/users' and '/thoughts' paths
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// Export the router
module.exports = router;
