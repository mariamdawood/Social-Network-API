// Import necessary components from mongoose
const { Schema, Types } = require('mongoose');

// Import the dateFormat utility function
const dateFormat = require('../utils/dateFormat');

// Define the reactionSchema
const reactionSchema = new Schema(
    {
        // Auto-generate a unique reactionId using Types.ObjectId
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        // Reaction body with a maximum length of 280 characters
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        // Username associated with the reaction
        username: {
            type: String,
            required: true
        },
        // Timestamp of when the reaction was created
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        }
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

// Export the reactionSchema
module.exports = reactionSchema;