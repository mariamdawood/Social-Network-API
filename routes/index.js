// Import the express Router
const router = require('express').Router();

// Import API routes
const apiRoutes = require('./api');

// Use API routes under the '/api' path
router.use('/api', apiRoutes);

// Handle invalid routes with a simple response
router.use((req, res) => {
    return res.send('Wrong route!');
});

// Export the router
module.exports = router;