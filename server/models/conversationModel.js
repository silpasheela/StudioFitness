const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({

    participants: [
        {
            trainer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Trainer",
            },
            user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            },
        },
    ],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    },
},
{
    timestamps: true,
});

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
