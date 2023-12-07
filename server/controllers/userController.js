const User = require('../models/userModel');
const Trainer = require('../models/trainerModel');
const Plan = require('../models/planModel');
const Appointment = require('../models/appointmentModel');
const axiosInstance = require('../utils/axiosHelper');
const {getHashedPassword,verifyPassword} = require('../utils/password');
const {signUpValidation,loginValidation,userProfileUpdateValidation,profilePictureValidation} = require('../utils/validation');
const {getToken, verifyToken} = require('../utils/token');
const {transporter} = require('../utils/emailHelper');
const {cloudinary} = require('../utils/cloudinaryHelper');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
require('../utils/googleStrategy')
const passport = require('passport')



const userSignUp = async(req,res) => {
    try {
        const {error} = signUpValidation.validate(req.body);
        if(error) {
            return res.status(400).json({
                message: error.details[0]?.message
            })
        }
    
        const {email,mobileNumber,password} = req.body;
        const userExists = await User.findOne({$or: [{ email: email }, { mobileNumber: mobileNumber }]});
    
        if(userExists) {
            return res.status(400).json({
                message: 'Email or Mobile number already exists !'
            })
        }
    
        const securedPassword = await getHashedPassword(password);
        const emailVerificationToken = await getToken(mobileNumber,email)

        const newUser = await User.create({
            ...req.body,
            password:securedPassword,
            emailVerificationToken
        })
    
        //email verification

        const verificationLink = `https://studio-fitness.vercel.app/verify?emailVerificationToken=${emailVerificationToken}`;

        const mailOptions = {
            to: newUser.email,
            subject: 'Email Verification',
            text: `Please click the following link to verify your email: ${verificationLink}`,
        };
        await transporter.sendMail(mailOptions);

        newUser.password = undefined
        newUser.emailVerificationToken = undefined

        res.status(201).json({
            newUser,
            message: 'User Registration Successful'
        })
    } catch (error) {
        console.log(error);
    }
}


const userEmailVerification = async(req,res) => {
    try {
        const {token} = req.params;

        const user = await User.findOneAndUpdate(
            {emailVerificationToken:token},
            {$set: {isEmailVerified:true}, $unset: {emailVerificationToken:1}}
        );

        if(!user) {
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


const userSignIn = async(req,res) => {

    const {error} = loginValidation.validate(req.body);
    if(error) {
        return res.status(400).json({
            message: error.details[0]?.message
        })
    }

    const {email,password} = req.body;

    const userExists = await User.findOne({email:email}).populate('subscriptionDetails');

    if(userExists) {
        const isPasswordMatch = await verifyPassword(password,userExists.password);

        if(isPasswordMatch) {
            const token = await getToken(userExists._id,email);

            userExists.password = undefined
            userExists.token=token;
            console.log(token)
            console.log(userExists.token)            
            
            //cookie configuration

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }

            return res.status(200).cookie("token", token, options).json({
                user: userExists,
                message: 'User Login Successful'
            });
        }

        return res.status(400).json({
            message: 'Incorrect password'
        })
    }
    return res.status(404).json({
        message: `User doesn't exists`
    })
}


const userLogOut = async(req,res) => {
    try {
        res.status(200).cookie('token',null,{
            expires: new Date(Date.now()),
            httpOnly: true
        })
        .json({
            message: 'User Logged out successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}



const googleAuthenticate = (req, res, next) => {
    passport.authenticate("google", { session: false }, async (err, user) => {
        try {
            if (err) {
            throw err
            }
            const token = await getToken(user?.user?._id, user?.user?.email)
            console.log(token)

            user.token=token;
            res.redirect(`https://studio-fitness.vercel.app/login?googleToken=${token}`)
        } catch (error) {
            console.log(error)
            return res.redirect(
            "https://studio-fitness.vercel.app/login?authentication=failed"
            )
        }
    })(req, res)
}


const failedGoogleAuthentication = async (req, res) => {
    res.redirect("https://studio-fitness.vercel.app/login?authentication=failed")
}



const userDashboard = async(req,res) => {
    console.log(req._id)
    try {
        const userExists = await User.findOne({_id:req.userId},{password:0,email:0,role:0,subscriptionDetails:0,emailVerificationToken:0,isEmailVerified:0,resetPasswordToken:0,isActive:0,googleId:0,__v:0});

        if(userExists) {
            return res.status(200).json({
                user:userExists,
                message: 'Welcome to the user dashboard'
            })
        }

        res.status(404).json({
            message: 'User not found'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}


const userPasswordReset = async (req,res) => {
    const { email } = req.body;
    try {
        const userExists = await User.findOne({email:email});
        if(userExists) {
            const token = await getToken(userExists._id,email);

            userExists.resetPasswordToken = token;
            await userExists.save();

            
            const passwordResetLink = `https://studio-fitness.vercel.app/user/reset-password-token/${token}`;

            const mailOptions = {
                to: userExists.email,
                subject: 'Password Reset',
                text: `Please click the following link to reset your password: ${passwordResetLink}`,
            };
            await transporter.sendMail(mailOptions);

            res.status(200).json({
                token,
                message: "Password reset link sent successfully"
            })
        } else {
            res.status(404).json({
                message: `User doesn't exists`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}


const userNewPassword = async(req,res) => {
    console.log(req)
    const {newPassword,confirmPassword,token} = req.body;
    if(newPassword === confirmPassword) {
        try {
            const securedPassword = await getHashedPassword(newPassword);

            const updatedUser = await User.findOneAndUpdate(
                {resetPasswordToken:token},
                {$set: {password:securedPassword},$unset: {resetPasswordToken:1}}
            )
            if(updatedUser) {
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


const userProfileUpdate = async(req,res) => {

    console.log(req.body)
    
    const {error} = userProfileUpdateValidation.validate(req.body);
    if(error) {
        console.log(error)
        return res.status(400).json({
            message: error.details[0]?.message,
        });        
    }

    try {
        
        const updateData = await User.findOne({_id:req.userId})


        if(!updateData) {
            return  res.status(404).json({
                message: `User doesn't exist`
            })
        }
            try {
                const projection = { password:0,email:0,role:0,subscriptionDetails:0,emailVerificationToken:0,isEmailVerified:0,resetPasswordToken:0,isActive:0,googleId:0,__v:0,bio:0 };
                
                const updateInfo = await User.findByIdAndUpdate(req.userId,req.body,{ new: true, runValidators: true, projection })
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
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}


const userProfilePictureEdit = async(req,res) => {

    const {error} = profilePictureValidation.validate(req.body);
    if(error) {
        console.log(error)
        return res.status(400).json({
            message: error.details[0]?.message,
        });        
    }

    try {
        const updateData = await User.findOne({_id:req.userId})


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
                const updateInfo = await User.findByIdAndUpdate(req.userId,updateData,{ new: true, runValidators: true, projection })
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
        res.status(500).json({
            message: 'Internal server error'
        });
    }

}


const userGetAllTrainers = async(req,res) => {
    
    try {
        const trainers = await Trainer.find({}, { password: 0 }).populate('service');

        if(trainers.length > 0) {
            return res.status(200).json({
                trainers,
                message: `Trainer details fetched successfully`
            })
        }
        return res.status(404).json({
            message:'No Trainer data available!'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}


const userGetTrainer = async(req,res) => {
    const {id} = req.params;


    try {
        const trainer = await Trainer.findOne({_id:id},{ password: 0 }).populate('service');

        if(trainer) {
            return res.status(200).json({
                trainer,
                message: `Trainer details fetched successfully`
            })
        } 
        res.status(404).json({
            message:`Trainer with id ${id} doesn't exist!`
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}



const getAllPlans = async(req,res) => {
    
    try {
        const plans = await Plan.find({}, { planId: 0 });

        if(plans.length > 0) {
            return res.status(200).json({
                plans,
                message: `Plan details fetched successfully`
            })
        }
        return res.status(404).json({
            message:'No Plan data available!'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}


const getPlanById = async(req,res) => {
    const {id} = req.params;


    try {
        const plan = await Plan.findOne({_id:id});

        if(plan) {
            return res.status(200).json({
                plan,
                message: `Plan details fetched successfully`
            })
        } 
        res.status(404).json({
            message:`Plan with id ${id} doesn't exist!`
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}



const userGetSlots = async (req, res) => {

    try {
        const trainerId = req.params.trainerId;

        const trainer = await Trainer.findById(trainerId);

        if (!trainer) {
            return res.status(404).json({ error: 'Trainer not found' });
        }

        // Get the current date and time
        const currentDateTime = new Date();

        // Filter and sort slots
        const filteredSlots = trainer.availableSlots
            .map((slot) => ({
                _id: slot._id,  // Include the _id of the date slot
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
        // Check if there are no available slots
        if (filteredSlots.length === 0) {
            return res.json({ message: 'No slots available for this trainer' });
        }

        return res.status(200).json({ slots: filteredSlots });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to fetch slots' });
    }
};




const userBookAppointment = async (req, res) => {

    try {
        const { slotId, dateId } = req.body;
        const userId = req.userId;
        const trainerId = req.params.trainerId;


        // Check if the user has an active subscription with a Premium plan
        const user = await User.findById(userId).populate({
            path: 'subscriptionDetails',
            populate: {
                path: 'planId',
                model: 'Plan'
            }
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!user.subscriptionDetails || user.subscriptionDetails.status !== 'active' || !user.subscriptionDetails.planId || user.subscriptionDetails.planId.planName !== 'Premium') {
            return res.status(403).json({ error: 'You need an active Premium subscription to book a slot.' });
        }

        const trainer = await Trainer.findOne({
            _id: trainerId,
            'availableSlots._id': dateId,
            'availableSlots.slots._id': slotId,
        });

        if (!trainer) {

            return res.status(404).json({ error: 'Slot not found' });

        }

        const slotDate = trainer.availableSlots.id(dateId).date;
        const slotStartTime = trainer.availableSlots.id(dateId).slots.id(slotId).startTime;
        const slotEndTime = trainer.availableSlots.id(dateId).slots.id(slotId).endTime;

        if (!slotDate || !slotStartTime || !slotEndTime) {

            return res.status(400).json({ error: 'Invalid slot' });

        }

        const isBooked = await Appointment.findOne({
            userId,
            slotDate,
            slotStartTime,
            isCancelled: false,
        });

        if (isBooked) {

            return res.status(400).json({ error: 'You have already booked a slot at the same date and time with another trainer.' });

        }

        const currentDateTime = new Date();
        const slotDateTime = new Date(`${slotDate} ${slotStartTime}`);

        if (slotDateTime <= currentDateTime) {

            return res.status(400).json({ error: 'Slot date and time cannot be in the past' });

        }

        const appointment = new Appointment({
            userId,
            trainerId: trainer._id,
            slotDate,
            slotStartTime,
            slotEndTime,
            dateId,
            slotId,
        });

        // Update the status field in the trainer model
        const trainerAvailableSlots = trainer.availableSlots.id(dateId);
        const slot = trainerAvailableSlots.slots.id(slotId);
        slot.status = true;

        // Save the changes to the trainer model
        await trainer.save();

        await appointment.save();

        return res.status(201).json({ success: 'Appointment booked successfully' });

    } catch (error) {

        if (error.code === 11000 && error.keyPattern && error.keyPattern.userId === 1) {

            return res.status(400).json({ error: 'You have already booked a slot at the same date and time.' });

        } else {

            console.error(error);
            return res.status(500).json({ error: 'Failed to book appointment' });

        }
    }
};



const userGetAppointments = async (req, res) => {
    try {
        const userId = req.userId;
        // const currentDate = new Date().toISOString();
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); 
    
        const appointments = await Appointment.find({
            userId,
            slotDate: { $gte: currentDate }, // Filter out past slots
            isCancelled: false, // Filter out cancelled appointments
        })
            .populate('trainerId', 'fullName') // Add more fields as needed
            .select('trainerId slotDate slotStartTime slotEndTime isTrainerApproved isCancelled rejectionReason')
            .sort({ slotDate: 1, slotStartTime: 1 }); // Sort by slotDate in ascending order, then slotStartTime

        if (appointments.length === 0) {
            // No appointments found for the user
            return res.status(404).json({ success: true, message: 'No appointments found' });
        }

        res.status(200).json({ success: true, appointments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to retrieve appointments' });
    }
};



const userCancelAppointment = async (req, res) => {
    try {
        const userId = req.userId;
        const appointmentId = req.params.appointmentId;
    
        // Find the appointment by ID and populate the associated trainer
        const appointment = await Appointment.findById(appointmentId).populate('trainerId');
    
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
    
        // Check if the appointment is already canceled
        if (appointment.isCancelled) {
            return res.status(400).json({ error: 'Appointment is already canceled' });
        }
    
        // Check if the appointment is approved by the trainer
        if (appointment.isTrainerApproved === 'approved') {
            return res.status(403).json({ error: 'Cannot cancel an approved appointment' });
        }
    
        // Reset the status in the trainer model
        const trainerId = appointment.trainerId._id;
        const dateId = appointment.dateId;
        const slotId = appointment.slotId;
    
        const trainer = await Trainer.findOne({
            _id: trainerId,
            'availableSlots._id': dateId,
            'availableSlots.slots._id': slotId,
        });
    
        if (!trainer) {
            return res.status(404).json({ error: 'Trainer not found' });
        }
    
        const slot = trainer.availableSlots.id(dateId).slots.id(slotId);
        slot.status = false;
    
        // Save the changes to the trainer model
        await trainer.save();
    
        // Mark the appointment as cancelled
        appointment.isCancelled = true;
        await appointment.save();
    
        return res.status(200).json({ success: true, message: 'Appointment canceled successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to cancel appointment' });
    }
};



const calculateBMI = async (req, res) => {

    try {
        const { height, weight } = req.body;

        if (!height || !weight) {
            return res.status(400).json({ error: 'Height, weight are required fields.' });
        }

        const response = await axiosInstance.get('/bmi', {
            params: { height, weight,system: 'metric' },
        });

        const bmiResult = response.data;
        res.status(200).json(bmiResult);

    } catch (error) {
        console.error('Error calculating BMI:', error.response.data);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports = {
    userSignUp,
    userEmailVerification,
    userSignIn,
    userLogOut,
    userProfilePictureEdit,
    userDashboard,
    userPasswordReset,
    userNewPassword,
    userProfileUpdate,
    googleAuthenticate,
    failedGoogleAuthentication,
    userGetAllTrainers,
    userGetTrainer,
    getAllPlans,
    getPlanById,
    userGetSlots,
    userBookAppointment,
    userGetAppointments,
    userCancelAppointment,
    calculateBMI,
}