// Import necessary models (Thought and User) from '../models'
const { Thought, User } = require('../models');

// Define thoughtController object
const thoughtController = {
    // Fetch all thoughts, sorted by createdAt in descending order
    async getThoughts(req, res) {
        try {
            // Query to get all thoughts from the database
            const dbThoughtData = await Thought.find().sort({ createdAt: -1 });

            // Respond with JSON containing the fetched thoughts
            res.json(dbThoughtData);
        } catch (err) {
            // Log error and respond with 500 status code for server error
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Fetch a single thought by its id
    async getSingleThought(req, res) {
        try {
            // Query to find a thought by its id
            const dbThoughtData = await Thought.findOne({ _id: req.params.thoughtId });

            // Respond with 404 if no thought is found
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            // Respond with JSON containing the fetched thought
            res.json(dbThoughtData);
        } catch (err) {
            // Log error and respond with 500 status code for server error
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Create a new thought
    async createThought(req, res) {
        try {
            // Create a new thought with data from the request body
            const dbThoughtData = await Thought.create(req.body);

            // Update the user with the new thought's id in their 'thoughts' array
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: dbThoughtData._id } },
                { new: true }
            );

            // Respond with 404 if no user is found
            if (!dbUserData) {
                return res.status(404).json({ message: 'Thought created but no user with this id!' });
            }

            // Respond with success message
            res.json({ message: 'Thought successfully created!' });
        } catch (err) {
            // Log error and respond with 500 status code for server error
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Update a thought by its id
    async updateThought(req, res) {
        // Attempt to update a thought by its id
        const dbThoughtData = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true });

        // Respond with 404 if no thought is found
        if (!dbThoughtData) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }

        // Respond with JSON containing the updated thought
        res.json(dbThoughtData);

        // Log error and respond with 500 status code for server error
        console.log(err);
        res.status(500).json(err);
    },
    // Delete a thought by its id
    async deleteThought(req, res) {
        try {
            // Delete a thought by its id
            const dbThoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            // Respond with 404 if no thought is found
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            // Remove thought id from user's 'thoughts' array
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );

            // Respond with 404 if no user is found
            if (!dbUserData) {
                return res.status(404).json({ message: 'Thought deleted but no user with this id!' });
            }

            // Respond with success message
            res.json({ message: 'Thought successfully deleted!' });
        } catch (err) {
            // Log error and respond with 500 status code for server error
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Add a reaction to a thought by its id
    async addReaction(req, res) {
        try {
            // Add a reaction to a thought by its id
            const dbThoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            // Respond with 404 if no thought is found
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            // Respond with JSON containing the updated thought
            res.json(dbThoughtData);
        } catch (err) {
            // Log error and respond with 500 status code for server error
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Remove a reaction from a thought by its id and reaction id
    async removeReaction(req, res) {
        try {
            // Remove a reaction from a thought by its id and reaction id
            const dbThoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            // Respond with 404 if no thought is found
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            // Respond with JSON containing the updated thought
            res.json(dbThoughtData);
        } catch (err) {
            // Log error and respond with 500 status code for server error
            console.log(err);
            res.status(500).json(err);
        }
    },
};

// Export the thoughtController object
module.exports = thoughtController;