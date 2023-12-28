// Import necessary components from mongoose
const { Schema, model } = require('mongoose');

// Define the userSchema
const userSchema = new Schema(
    {
        // User's username with uniqueness and trimming constraints
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        // User's email with uniqueness and email format validation
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!'],
        },
        // Array of thought ids associated with the user
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        // Array of user ids representing friends
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        // Configure toJSON to include virtuals
        toJSON: {
            virtuals: true,
        },
        // Disable inclusion of the virtual 'id' property
        id: false,
    }
);

// Define a virtual property 'friendCount' to get the length of the 'friends' array
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Create the User model using the userSchema
const User = model('User', userSchema);

// Export the User model
module.exports = User;