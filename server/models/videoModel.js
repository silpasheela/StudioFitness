const mongoose = require('mongoose')

const videoSchema = mongoose.Schema({

    title: {
        type: String,
    },
    description: {
        type: String,
    },
    fileUrl: {
        type: String,
        unique: true
    },
    trainerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trainer'
    },
})


module.exports = mongoose.model('Video',videoSchema);