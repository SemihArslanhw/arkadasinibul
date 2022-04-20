const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        postId: {
            type: String,
            required: true,
        },
        senderId: {
            type: String,
            required: true,
        },
        conversationId: {
            type: String,
            required: true,
        },
    }
    );

    module.exports = mongoose.model('Comment', CommentSchema);