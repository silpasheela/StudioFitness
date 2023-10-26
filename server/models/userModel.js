const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    fullName: {
        type: String,
        // required: true
    },
    dateOfBirth: {
        type: Date,
        // required: true
    },
    gender: {
        type: String,
        // required: true
    },
    mobileNumber: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        // required: true
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
    subscriptionDetails: [
        {
            subscribedPlan: {
                type: String,
                ref: "Plan"
            },
            startDate: {
                type: Date
            },
            expiryDate: {
                type: Date
            },
            isSubscriptionActive: {
                type: Boolean
            }
        }
    ],
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
        // required: true

    },
    bio: {
        type: String,
    }


})


module.exports = mongoose.model('User',userSchema);


