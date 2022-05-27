const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        senderId: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },

    }
    );

    module.exports = mongoose.model("Post", PostSchema);