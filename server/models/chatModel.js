const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({

    participants: [{
        
        trainer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Trainer'
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }} 
    ],

    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",   
    }
}, 
{
    timestamps : true
});

module.exports = mongoose.model('Chat', chatSchema);