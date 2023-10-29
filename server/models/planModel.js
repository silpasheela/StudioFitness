const mongoose = require('mongoose')

const planSchema = mongoose.Schema({

    planName: {
        type: String
    },
    planAmount: {
        type: String
    },
    planId: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    features: [{
        type: String,
    }],

})



module.exports = mongoose.model('Plan',planSchema);
