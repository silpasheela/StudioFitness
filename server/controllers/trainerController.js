const Trainer = require('../models/trainerModel');
const Service = require('../models/serviceModel');
const Appointment = require('../models/appointmentModel');
const {getHashedPassword,verifyPassword} = require('../utils/password');
const {signUpValidation,loginValidation,trainerProfileUpdateValidation,profilePictureValidation} = require('../utils/validation');
const {getToken} = require('../utils/token');
const {cloudinary} = require('../utils/cloudinaryHelper');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const {transporter} = require('../utils/emailHelper')

const trainerSignUp = async(req,res) => {
    try {
        const {error} = signUpValidation.validate(req.body);
        if(error) {
            return res.status(400).json({
                message: error.details[0]?.message
            })
        }
    
        const {email,mobileNumber,password} = req.body;
        const trainerExists = await Trainer.findOne({$or: [{ email: email }, { mobileNumber: mobileNumber }]});
    
        if(trainerExists) {
            return res.status(400).json({
                message: 'Email or Mobile number already exists !'
            })
        }
    
        const securedPassword = await getHashedPassword(password);
        const emailVerificationToken = await getToken(mobileNumber,email)

        const newTrainer = await Trainer.create({
            ...req.body,
            password:securedPassword,
            emailVerificationToken
        })
    
        //email verification

        const verificationLink = `https://studio-fitness.vercel.app/verify?emailVerificationToken=${emailVerificationToken}`;

        const mailOptions = {
            to: newTrainer.email,
            subject: 'Email Verification',
            text: `Please click the following link to verify your email: ${verificationLink}`,
        };
        await transporter.sendMail(mailOptions);

        newTrainer.password = undefined
        newTrainer.emailVerificationToken = undefined

        res.status(201).json({
            newTrainer,
            message: 'Trainer Registration Successful'
        })
    } catch (error) {
        console.log(error);
    }
}


const trainerEmailVerification = async(req,res) => {
    try {
        const {token} = req.params;

        const trainer = await Trainer.findOneAndUpdate(
            {emailVerificationToken:token},
            {$set: {isEmailVerified:true}, $unset: {emailVerificationToken:1}}
        );

        if(!trainer) {
            return res.status(404).json({ 
                message: 'Invalid or expired token.' 
            });
        }

        return res.status(200).json({ message: 'Email verified successfully.' });

    } catch (error) {
        res.status(500).json({ 
            message: 'Internal server error.' 
        });
    }
}


const trainerSignIn = async(req,res) => {

    const {error} = loginValidation.validate(req.body);
    if(error) {
        return res.status(400).json({
            message: error.details[0]?.message
        })
    }

    const {email,password} = req.body;

    const trainerExists = await Trainer.findOne({email:email});

    if(trainerExists) {
        const isPasswordMatch = await verifyPassword(password,trainerExists.password);

        if(isPasswordMatch) {
            const token = await getToken(trainerExists._id,email);

            trainerExists.password = undefined
            trainerExists.token=token;
            console.log(token)
            console.log(trainerExists.token)  

            //cookie configuration

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }

            return res.status(200).cookie("token", token, options).json({
                user: trainerExists,
                message: 'Trainer Login Successful'
            });
        }

        return res.status(400).json({
            message: 'Incorrect password'
        })
    }
    return res.status(404).json({
        message: `Trainer doesn't exists`
    })
}


const trainerLogOut = async(req,res) => {
    try {
        res.status(200).cookie('token',null,{
            expires: new Date(Date.now()),
            httpOnly: true
        })
        .json({
            message: 'Trainer Logged out successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}


const trainerDashboard = async(req,res) => {
    try {
        const trainerExists = await Trainer.findOne({_id:req.userId});
        trainerExists.password = undefined;

        if(trainerExists) {
            return res.status(200).json({
                trainer:trainerExists,
                message: 'Welcome to the trainer dashboard'
            })
        }

        res.status(404).json({
            message: 'Trainer not found'
        })

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}


const trainerPasswordReset = async (req,res) => {
    const {email} = req.body;

    try {
        const trainerExists = await Trainer.findOne({email:email});
        if(trainerExists) {
            const token = await getToken(trainerExists._id,email);

            trainerExists.resetPasswordToken = token;
            await trainerExists.save();

            
            const passwordResetLink = `https://studio-fitness.vercel.app/trainer/reset-password-token/${token}`;

            const mailOptions = {
                to: trainerExists.email,
                subject: 'Password Reset',
                text: `Please click the following link to reset your password: ${passwordResetLink}`,
            };
            await transporter.sendMail(mailOptions);

            res.status(200).json({
                message: "Password reset link sent successfully"
            })
        } else {
            res.status(404).json({
                message: `Trainer doesn't exists`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}


const trainerNewPassword = async(req,res) => {
    console.log(req)
    const {newPassword,confirmPassword,token} = req.body;
    if(newPassword === confirmPassword) {
        try {
            const securedPassword = await getHashedPassword(newPassword);

            const updatedTrainer = await Trainer.findOneAndUpdate(
                {resetPasswordToken:token},
                {$set: {password:securedPassword},$unset: {resetPasswordToken:1}}
            )
            if(updatedTrainer) {
                return res.status(200).json({
                    message:"Password changed successfully"
                })
            }
            else {
                return res.status(403).json({
                    message:'Invalid token or expired!'
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Internal server error"
            })
        }
    }
}



const trainerProfileUpdate = async(req,res) => {

    
    const {error} = trainerProfileUpdateValidation.validate(req.body);
    if(error) {
        console.log(error)
        return res.status(400).json({
            message: error.details[0]?.message,
        });        
    }
    try {
        
        const updateData = await Trainer.findOne({_id:req.userId})


        if(!updateData) {
            return  res.status(404).json({
                message: `User doesn't exist`
            })
        }



        upload.single('certificate')(req,res,async(error) => {
            try {
                if(error) {
                    return res.status(500).json({
                        message: 'Certificate upload error'
                    });
                }
                if(req.file) {
                    const trainerCertificate = await cloudinary.uploader.upload(req.file.path);
                    req.body.certificate = trainerCertificate.secure_url;
                }
                const projection = { password:0,email:0,role:0,emailVerificationToken:0,isEmailVerified:0,resetPasswordToken:0,isActive:0,__v:0 };
                
                const updateInfo = await Trainer.findByIdAndUpdate(req.userId,req.body,{ new: true, runValidators: true, projection })
                res.status(200).json({
                    message: 'Profile updated successfully',
                    user:updateInfo
                });
            } catch (error) {
                console.log(error)
                return res.status(500).json({
                    message: 'Error in updating user data'
                });
            }
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}



const trainerProfilePictureEdit = async(req,res) => {

    const {error} = profilePictureValidation.validate(req.body);
    if(error) {
        console.log(error)
        return res.status(400).json({
            message: error.details[0]?.message,
        });        
    }

    try {
        const updateData = await Trainer.findOne({_id:req.userId})

        if(!updateData) {
            return  res.status(404).json({
                message: `User doesn't exist`
            })
        }

        upload.single('profilePicture')(req,res,async(error) => {
            try {

                if(error) {
                    return res.status(500).json({
                        message: 'Image upload error'
                    });
                }
                if(req.file) {
                    const userProfilePicture = await cloudinary.uploader.upload(req.file.path);
                    updateData.profilePicture = userProfilePicture.secure_url;
                }
                if (req.body.bio) {
                    updateData.bio = await req.body.bio;
                }

                const projection = { password:0,email:0,role:0,subscriptionDetails:0,emailVerificationToken:0,isEmailVerified:0,resetPasswordToken:0,isActive:0,googleId:0,__v:0 };
                const updateInfo = await Trainer.findByIdAndUpdate(req.userId,updateData,{ new: true, runValidators: true, projection })
                res.status(200).json({
                    message: 'Profile Image updated successfully',
                    user:updateInfo
                });
            } catch (error) {
                console.log(error)
                return res.status(500).json({
                    message: 'Error in updating user Image'
                });
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}


const trainerGetAllServices = async(req,res) => {

    try {
        const services = await Service.find({});
        if(services) {
            return res.status(200).json({
                services,
                message: `Services details fetched successfully`
            })
        }
        res.status(404).json({
            message:'No user data available!'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}



const convertTimeTo24HourFormat = (time) => {
    const [hour, minute, period] = time.split(/:| /);
    let hourInt = parseInt(hour, 10);

    if (period && period.toLowerCase() === 'pm' && hourInt !== 12) {
        hourInt += 12;
    }

    if (period && period.toLowerCase() === 'am' && hourInt === 12) {
        hourInt = 0;
    }

    return `${hourInt.toString().padStart(2, '0')}:${minute}`;
};



const trainerAddSlot = async (req, res) => {

    try {
        const trainerId = req.userId;
        const { date, startTime, endTime } = req.body;

        // Convert the time format to 24-hour format
        const formattedStartTime = convertTimeTo24HourFormat(startTime);
        const formattedEndTime = convertTimeTo24HourFormat(endTime);

        const start = new Date(`1970-01-01T${formattedStartTime}:00Z`);
        const end = new Date(`1970-01-01T${formattedEndTime}:00Z`);

        // Check if the end time is greater than the start time and not the same
        if (end <= start || formattedStartTime === formattedEndTime) {
            return res.status(400).json({ error: 'Invalid time range. End time should be greater than the start time, and they should not be the same.' });
        }

        const currentDate = new Date(); // Get the current date and time

        const slotDateTime = new Date(date);
        slotDateTime.setHours(start.getUTCHours(), start.getUTCMinutes(), 0, 0);

        // Check if the slot date and time are greater than or equal to the current date and time
        if (slotDateTime < currentDate) {
            return res.status(400).json({ error: 'Slot date and time cannot be in the past' });
        }

        const trainer = await Trainer.findById(trainerId);

        if (!trainer) {
            return res.status(404).json({ error: 'Trainer not found' });
        }

        const selectedDate = trainer.availableSlots.find(slot => {
            const slotDate = new Date(slot.date).toDateString();
            const inputDate = new Date(date).toDateString();
            return slotDate === inputDate;
        });

        // Check if the date already has 10 slots
        const isSlotLimitReached = selectedDate && selectedDate.slots.length >= 10;

        if (isSlotLimitReached) {
            return res.status(400).json({ error: 'Maximum slots limit reached for the date' });
        }

        // Check if there's a slot with the same start time on the same date
        const isDuplicateStartTime = selectedDate && selectedDate.slots.some(slot => slot.startTime === formattedStartTime);

        if (isDuplicateStartTime) {
            return res.status(400).json({ error: 'Duplicate slot start time for the same date' });
        }

        // If the date doesn't exist in the availableSlots array, create a new entry
        if (!selectedDate) {
            trainer.availableSlots.push({ date, slots: [{ startTime: formattedStartTime, endTime: formattedEndTime, status: false }] });
        } else {
            selectedDate.slots.push({ startTime: formattedStartTime, endTime: formattedEndTime, status: false });
        }

        await trainer.save();
        return res.json({ 
            trainer,
            success: 'Slot added successfully' 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to add slot' });
    }
};


const trainerGetSlots = async (req, res) => {

    try {
        const trainerId = req.userId;

        const trainer = await Trainer.findById(trainerId);

        if (!trainer) {
            return res.status(404).json({ error: 'Trainer not found' });
        }

        // Get the current date and time
        const currentDateTime = new Date();

        // Filter and sort slots
        const filteredSlots = trainer.availableSlots
            .map((slot) => ({
                date: new Date(slot.date),
                slots: slot.slots.filter((s) => {
                    const slotDateTime = new Date(slot.date);
                    const startTime = new Date(`1970-01-01T${s.startTime}`);
                    slotDateTime.setHours(startTime.getHours(), startTime.getMinutes(), 0, 0);

                    // Compare the start time with the current time
                    return slotDateTime > currentDateTime;
                })
                .sort((a, b) => new Date(`1970-01-01T${a.startTime}`) - new Date(`1970-01-01T${b.startTime}`)),  // Sort the slots
            }))
            .filter((slot) => slot.slots.length > 0)
            .sort((a, b) => a.date - b.date);

        // Format the time as AM/PM in the 'Asia/Kolkata' time zone
            filteredSlots.forEach((slot) => {
                slot.slots.forEach((s) => {
                    const startTime = new Date(`1970-01-01T${s.startTime}`);
                    const endTime = new Date(`1970-01-01T${s.endTime}`);
                    const options = { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'Asia/Kolkata' };
                    s.startTime = startTime.toLocaleString('en-IN', options);
                    s.endTime = endTime.toLocaleString('en-IN', options);
                });
            });
        return res.status(200).json({ slots: filteredSlots });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to fetch slots' });
    }
};



const trainerUpdateSlot = async (req, res) => {
    try {
        const trainerId = req.userId;
        const slotId = req.params.slotId; // Get the slot ID from URL parameter
        const { date, startTime, endTime } = req.body;

        // Convert the time format to 24-hour format
        const formattedStartTime = convertTimeTo24HourFormat(startTime);
        const formattedEndTime = convertTimeTo24HourFormat(endTime);

        const start = new Date(`1970-01-01T${formattedStartTime}:00Z`);
        const end = new Date(`1970-01-01T${formattedEndTime}:00Z`);

        // Check if the end time is greater than the start time and not the same
        if (end <= start || formattedStartTime === formattedEndTime) {
            return res.status(400).json({ error: 'Invalid time range. End time should be greater than the start time, and they should not be the same.' });
        }

        const currentDate = new Date(); // Get the current date and time

        const slotDateTime = new Date(date);
        slotDateTime.setHours(start.getUTCHours(), start.getUTCMinutes(), 0, 0);

        // Check if the slot date and time are greater than or equal to the current date and time
        if (slotDateTime < currentDate) {
            return res.status(400).json({ error: 'Slot date and time cannot be in the past' });
        }

        const trainer = await Trainer.findById(trainerId);

        if (!trainer) {
            return res.status(404).json({ error: 'Trainer not found' });
        }

        const selectedDate = trainer.availableSlots.find(slot => {
            const slotDate = new Date(slot.date).toDateString();
            const inputDate = new Date(date).toDateString();
            return slotDate === inputDate;
        });


        // Check if there's a slot with the same start time on the same date
        const isDuplicateStartTime = selectedDate && selectedDate.slots.some(slot => slot.startTime === formattedStartTime && slot._id.toString() !== slotId);

        if (isDuplicateStartTime) {
            return res.status(400).json({ error: 'Duplicate slot start time for the same date' });
        }

        // Find the slot by its ID
        const slotToUpdate = selectedDate.slots.find(slot => slot._id.toString() === slotId);

        if (!slotToUpdate) {
            return res.status(404).json({ error: 'Slot not found' });
        }

        // Update the slot with the new data
        slotToUpdate.startTime = formattedStartTime;
        slotToUpdate.endTime = formattedEndTime;

        await trainer.save();
        return res.json({ 
            trainer,
            success: 'Slot updated successfully' 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to update slot' });
    }
};



const trainerDeleteSlot = async (req, res) => {

    try {
        const trainerId = req.userId;
        const slotId = req.params.slotId; // Get the slot ID from URL parameter
    
        const trainer = await Trainer.findById(trainerId);
    
        if (!trainer) {
            return res.status(404).json({ error: 'Trainer not found' });
        }
    
        // Find the slot by its ID
        const selectedDate = trainer.availableSlots.find((slot) =>
            slot.slots.some((s) => s._id.toString() === slotId)
        );
    
        if (!selectedDate) {
            return res.status(404).json({ error: 'Slot not found' });
        }
    
        // Remove the slot by its ID
        selectedDate.slots = selectedDate.slots.filter(
            (s) => s._id.toString() !== slotId
        );
    
        await trainer.save();
        return res.json({
            trainer,
            success: 'Slot deleted successfully',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to delete slot' });
    }
};



const trainerDeleteSlotsByDateId = async (req, res) => {

    try {
        const trainerId = req.userId;
        const dateId = req.params.dateId; // Get the date ID from the URL parameter
    
        const trainer = await Trainer.findById(trainerId);
    
        if (!trainer) {
            return res.status(404).json({ error: 'Trainer not found' });
        }
    
        // Find the date by its ID and remove all slots for that date
        const dateIndex = trainer.availableSlots.findIndex((slot) => slot._id.toString() === dateId);
    
        if (dateIndex === -1) {
            return res.status(404).json({ error: 'Date not found' });
        }
    
        trainer.availableSlots.splice(dateIndex, 1);
    
        await trainer.save();
        return res.json({
            trainer,
            success: `All slots for the specified date ID (${dateId}) deleted successfully`,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to delete slots by date ID' });
    }
}



const trainerApproveAppointment = async (req,res) => {

    try {
        const trainerId = req.userId; 
        const appointmentId = req.params.appointmentId; // Assuming appointment ID is in the URL parameter
    
        // Find the trainer by ID
        const trainer = await Trainer.findById(trainerId);
    
        if (!trainer) {
            return res.status(404).json({ error: 'Trainer not found' });
        }
    
        // Find the appointment by ID
        const appointment = await Appointment.findById(appointmentId);
    
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
    
        // Check if the appointment already approved
        if (appointment.isTrainerApproved === 'approved') {
            return res.status(400).json({ error: 'Appointment is already approved' });
        }
    
        // Update the isTrainerApproved field
        appointment.isTrainerApproved = 'approved';
    
        // Save the changes to the appointment
        await appointment.save();
    
        return res.status(200).json({ success: true, message: 'Appointment approved successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to approve appointment' });
    }
}



const trainerGetAppointments = async (req,res) => {

    try {
        const trainerId = req.userId; 
        // const currentDate = new Date().toISOString();
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); 
    
        const appointments = await Appointment.find({
            trainerId,
            slotDate: { $gte: currentDate }, // Filter out past slots
            isCancelled: false,
        })
            .populate('userId', 'fullName') // Add more fields as needed
            .select('userId slotDate slotStartTime slotEndTime isTrainerApproved isCancelled rejectionReason')
            .sort({ slotDate: 1, slotStartTime: 1 }); // Sort by slotDate in ascending order, then slotStartTime
    
        if (appointments.length === 0) {
            // No upcoming appointments found for the trainer
            return res.status(404).json({ success: true, message: 'No upcoming appointments found' });
        }
    
        res.status(200).json({ success: true, appointments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to retrieve appointments' });
    }
}



const trainerRejectAppointment = async (req,res) => {

    try {
        const trainerId = req.userId; 
        const appointmentId = req.params.appointmentId; 
        const rejectionReason = req.body.reason;

    
        // Find the trainer by ID
        const trainer = await Trainer.findById(trainerId);
    
        if (!trainer) {
            return res.status(404).json({ error: 'Trainer not found' });
        }
    
        // Find the appointment by ID
        const appointment = await Appointment.findById(appointmentId);
    
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
    
    
        // Update the isTrainerApproved field to false
        appointment.isTrainerApproved = 'rejected';
        appointment.rejectionReason = rejectionReason;
    
        // Update the status field in the trainer model to false
        const trainerAvailableSlots = trainer.availableSlots.id(appointment.dateId);
        const slot = trainerAvailableSlots.slots.id(appointment.slotId);
        slot.status = false;
    
        // Save changes to both the appointment and trainer models
        await appointment.save();
        await trainer.save();
    
        return res.status(200).json({ success: true, message: 'Appointment rejected successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to reject appointment' });
    }
}



const getAppointmentDetails = async (req, res) => {

    const { id } = req.params;
    try {
        const appointment = await Appointment.findOne({ _id: id });
        if (appointment) {
            return res.status(200).json({ appointment });
        }
        return res.status(404).json({ message: "No appointment found" });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};



module.exports = {
    trainerSignUp,
    trainerEmailVerification,
    trainerSignIn,
    trainerLogOut,
    trainerDashboard,
    trainerPasswordReset,
    trainerNewPassword,
    trainerProfileUpdate,
    trainerProfilePictureEdit,
    trainerGetAllServices,
    trainerAddSlot,
    trainerGetSlots,
    trainerUpdateSlot,
    trainerDeleteSlot,
    trainerDeleteSlotsByDateId,
    trainerApproveAppointment,
    trainerRejectAppointment,
    trainerGetAppointments,
    getAppointmentDetails
}