const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    fullName: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
    gender: {
        type: String,
    },
    mobileNumber: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
    },
    address: {
        street: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        zip: {
            type: String
        }
    },
    age: {
        type: Number
    },
    weight: {
        type: Number
    },
    height: {
        type: Number
    },
    profilePicture: {
        type: String
    },
    subscriptionDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscription'
    },
    role: {
        type: String,
        default: 'user'
    },
    emailVerificationToken: {
        type: String
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: {
        type :String
    },
    isActive: {
        type:Boolean,
        default: true
    },
    token: {
        type :String
    },
    googleId: {
        type :String,

    },
    bio: {
        type: String,
    },
    stripeCustomerId: {
        type: String
    }


})


module.exports = mongoose.model('User',userSchema);


