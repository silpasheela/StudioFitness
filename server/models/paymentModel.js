const mongoose = require('mongoose')

const paymentSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    subscriptionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscription'
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



module.exports = mongoose.model('Payment',paymentSchema);
