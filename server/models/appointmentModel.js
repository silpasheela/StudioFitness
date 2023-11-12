const mongoose = require('mongoose')

const appointmentSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    trainerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trainer'
    },
    slotDate: {
        type: Date,
        required: true,
    },
    slotStartTime: {
        type: String,
        required: true,
    },
    slotEndTime: {
        type: String,
        required: true,
    },
    isTrainerApproved: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    rejectionReason: {
        type: String,
    },
    isCancelled: {
        type: Boolean,
        default: false, 
    },
    dateId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    slotId: {
        type: mongoose.Schema.Types.ObjectId,
    }
});


appointmentSchema.index({ userId: 1, slotDate: 1, slotStartTime: 1 }, { unique: true });


module.exports = mongoose.model('Appointment',appointmentSchema);