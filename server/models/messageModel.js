const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({

    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'senderModel', 
    },
    senderModel: {
        type: String,
        enum: ['Trainer', 'User'], 
        required: true,
    },
    content: { 
        type: String, 
        required: true 
    },
},
{
    timestamps : true
});

module.exports = mongoose.model('Message', messageSchema);