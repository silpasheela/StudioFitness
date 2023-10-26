const mongoose = require('mongoose')

const trainerSchema = mongoose.Schema({

    fullName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        // required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    // address: {
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
        },
    // },
    profilePicture: {
        type: String
    },
    role: {
        type: String,
        default: 'trainer'
    },
    qualification: {
        type: String,
        // required: true
    },
    certificate: {
        type: String,
        // required: true
    },
    likes: {
        count: {
            type: Number
        },
        user: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    ratings: {
        count: {
            type: Number
        },
        user: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            comment: {
                type: String
            }
        }
    ],
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'

        // required: true
    },
    availableSlots: [
        {
            date: Date,
            slots: [
                {
                    startTime: {
                        type: String
                    },
                    endTime: {
                        type: String
                    },
                    status: {
                        type: Boolean,
                        default: false
                    }
                }
            ]
        }
    ],
    emailVerificationToken: {
        type: String
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    isAdminVerified: {
        type: Boolean,
        default: false
    },
    isActive: {
        type:Boolean,
        default: true
    },
    token: {
        type :String
    }
})


module.exports = mongoose.model('Trainer',trainerSchema);