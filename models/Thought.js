// Import necessary components from mongoose
const { Schema, model } = require('mongoose');

// Import the Reaction schema and dateFormat utility function
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

// Define the thoughtSchema
const thoughtSchema = new Schema(
    {
        // Text content of the thought with length constraints
        thoughtText: {
            type: String,
            required: 'You need to leave a thought!',
            minlength: 1,
            maxlength: 280
        },
        // Timestamp of when the thought was created
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        // Username associated with the thought
        username: {
            type: String,
            required: true
        },
        // Array of reactions, using the reactionSchema
        reactions: [reactionSchema]
    },
    {
        // Configure toJSON to include getters
        toJSON: {
            getters: true
        },
        // Disable inclusion of the virtual 'id' property
        id: false
    }
);

// Define a virtual property 'reactionCount' to get the length of the 'reactions' array
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Create the Thought model using the thoughtSchema
const Thought = model('Thought', thoughtSchema);

// Export the Thought model
module.exports = Thought;