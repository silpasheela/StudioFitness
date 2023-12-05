const mongoose = require('mongoose')

const subscriptionSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    planId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan'
    },
    subscriptionId: {
        type: String
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    status: {
        type: String   //subscription status
    },
    paymentDate: {
        type: Date
    },
    amount: {
        type: String
    },
    paymentStatus: {
        type: String
    },

})


module.exports = mongoose.model('Subscription',subscriptionSchema);
