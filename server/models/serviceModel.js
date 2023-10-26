const mongoose = require('mongoose')

const serviceSchema = mongoose.Schema({

    service: {
        type: String,
    },

    isActive: {
        type:Boolean,
        default: true
    },
    description: {
        type: String,
    }

})


module.exports = mongoose.model('Service',serviceSchema);