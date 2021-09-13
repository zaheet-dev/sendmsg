const mongoose = require('mongoose');

const Post = mongoose.model('Post', {
    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    imagePath: {
        type: String,
        required: true
    },

    otpsent: {
        type: Boolean
    },

    otps: {
        type: String
    },

    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});


module.exports = Post