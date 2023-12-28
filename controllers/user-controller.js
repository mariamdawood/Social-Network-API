// Import necessary models (User and Thought) from '../models'
const { User, Thought } = require('../models');

// Define userController object
const userController = {
    // Fetch all users, excluding '__v' field
    async getUsers(req, res) {
        try {
            // Query to get all users from the database, excluding '__v'
            const dbUserData = await User.find().select('-__v');

            // Respond with JSON containing the fetched users
            res.json(dbUserData);
        } catch (err) {
            // Log error and respond with 500 status code for server error
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Fetch a single user by their id, populating 'friends' and 'thoughts' fields
    async getSingleUser(req, res) {
        try {
            // Query to find a user by their id, excluding '__v' and populating 'friends' and 'thoughts'
            const dbUserData = await User.findOne({ _id: req.params.userId }).select('-__v').populate('friends').populate('thoughts');

            // Respond with 404 if no user is found
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user with this id!' });
            }

            // Respond with JSON containing the fetched user
            res.json(dbUserData);
        } catch (err) {
            // Log error and respond with 500 status code for server error
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Create a new user with data from the request body
    async createUser(req, res) {
        try {
            // Create a new user with data from the request body
            const dbUserData = await User.create(req.body);

            // Respond with JSON containing the created user
            res.json(dbUserData);
        } catch (err) {
            // Log error and respond with 500 status code for server error
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Update a user by their id
    async updateUser(req, res) {
        try {
            // Update a user by their id, setting fields from the request body
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            // Respond with 404 if no user is found
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user with this id!' });
            }

            // Respond with JSON containing the updated user
            res.json(dbUserData);
        } catch (err) {
            // Log error and respond with 500 status code for server error
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Delete a user by their id and associated thoughts
    async deleteUser(req, res) {
        try {
            // Delete a user by their id
            const dbUserData = await User.findOneAndDelete({ _id: req.params.userId });

            // Respond with 404 if no user is found
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user with this id!' });
            }

            // Get ids of user's 'thoughts' and delete them all
            await Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });

            // Respond with success message
            res.json({ message: 'User and associated thoughts deleted!' });
        } catch (err) {
            // Log error and respond with 500 status code for server error
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Add a friend to a user's 'friends' array
    async addFriend(req, res) {
        try {
            // Add a friend to a user's 'friends' array
            const dbUserData = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true });

            // Respond with 404 if no user is found
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user with this id!' });
            }

            // Respond with JSON containing the updated user
            res.json(dbUserData);
        } catch (err) {
            // Log error and respond with 500 status code for server error
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Remove a friend from a user's 'friends' array
    async removeFriend(req, res) {
        try {
            // Remove a friend from a user's 'friends' array
            const dbUserData = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true });

            // Respond with 404 if no user is found
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user with this id!' });
            }

            // Respond with JSON containing the updated user
            res.json(dbUserData);
        } catch (err) {
            // Log error and respond with 500 status code for server error
            console.log(err);
            res.status(500).json(err);
        }
    },
};

// Export the userController object
module.exports = userController;