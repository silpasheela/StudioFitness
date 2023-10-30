const User = require('../models/userModel');
const Trainer = require('../models/trainerModel');
const Plan = require('../models/planModel');
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

        const verificationLink = `http://localhost:3000/verify?emailVerificationToken=${emailVerificationToken}`;

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
            console.log(userExists._id)
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
    console.log("hi")
    passport.authenticate("google", { session: false }, async (err, user) => {
        try {
            if (err) {
            throw err
            }
            console.log("myuser",user?.user)
            const token = await getToken(user?.user?._id, user?.user?.email)
            console.log(token)

            user.token=token;
            res.redirect(`http://localhost:3000/login?googleToken=${token}`)
        } catch (error) {
            console.log(error)
            return res.redirect(
            "http://localhost:3000/login?authentication=failed"
            )
        }
    })(req, res)
}


const failedGoogleAuthentication = async (req, res) => {
    res.redirect("http://localhost:3000/login?authentication=failed")
}



const userDashboard = async(req,res) => {
    console.log(req._id)
    try {
        const userExists = await User.findOne({_id:req.userId},{password:0,email:0,role:0,subscriptionDetails:0,emailVerificationToken:0,isEmailVerified:0,resetPasswordToken:0,isActive:0,googleId:0,__v:0});
        // userExists.password = undefined;

        if(userExists) {
            console.log(userExists)
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
    // console.log(req)
    const { email } = req.body;
    // console.log(req.body)
    try {
        const userExists = await User.findOne({email:email});
        // console.log("hey",userExists)
        if(userExists) {
            const token = await getToken(userExists._id,email);
            // console.log(token)

            userExists.resetPasswordToken = token;
            // console.log(userExists)
            await userExists.save();
            // console.log(token)
            // console.log(userExists.resetPasswordToken)
            
            const passwordResetLink = `http://localhost:3000/user/reset-password-token/${token}`;

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
    // const {token} = req.params;
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

        console.log("updateData",updateData)

        if(!updateData) {
            return  res.status(404).json({
                message: `User doesn't exist`
            })
        }
        // upload.single('profilePicture')(req,res,async(error) => {
            try {
                // if(error) {
                //     return res.status(500).json({
                //         message: 'Image upload error'
                //     });
                // }
                // if(req.file) {
                //     const userProfilePicture = await cloudinary.uploader.upload(req.file.path,{folder:'Users'});
                //     updateInfo.profilePicture = userProfilePicture.secure_url;
                //     // console.log(userProfilePicture)
                // }
                const projection = { password:0,email:0,role:0,subscriptionDetails:0,emailVerificationToken:0,isEmailVerified:0,resetPasswordToken:0,isActive:0,googleId:0,__v:0,bio:0 };
                
                const updateInfo = await User.findByIdAndUpdate(req.userId,req.body,{ new: true, runValidators: true, projection })
                console.log("updateInfo",updateInfo)
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
        // })
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

        console.log("hoi",updateData)

        if(!updateData) {
            console.log("im if")
            return  res.status(404).json({
                message: `User doesn't exist`
            })
        }
        console.log("im outside if")

        upload.single('profilePicture')(req,res,async(error) => {
            console.log("im inside upld");
            try {
                console.log("im inside try");

                if(error) {
                    console.log("im inside err");
                    return res.status(500).json({
                        message: 'Image upload error'
                    });
                }
                console.log("req",req.file)
                if(req.file) {
                    console.log("im inside req");
                    const userProfilePicture = await cloudinary.uploader.upload(req.file.path);
                    updateData.profilePicture = userProfilePicture.secure_url;
                    console.log("dey",userProfilePicture)
                    console.log("mybio",req.body.bio)
                }
                if (req.body.bio) {
                    updateData.bio = await req.body.bio;
                }

                console.log("data",updateData)
                const projection = { password:0,email:0,role:0,subscriptionDetails:0,emailVerificationToken:0,isEmailVerified:0,resetPasswordToken:0,isActive:0,googleId:0,__v:0 };
                const updateInfo = await User.findByIdAndUpdate(req.userId,updateData,{ new: true, runValidators: true, projection })
                // console.log(updateInfo)
                res.status(200).json({
                    message: 'Profile Image updated successfully',
                    user:updateInfo
                });
                // console.log("res",updateInfo)
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

    console.log('myid',id)

    try {
        const trainer = await Trainer.findOne({_id:id},{ password: 0 }).populate('service');
        console.log('user',trainer);

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

    console.log('myid',id)

    try {
        const plan = await Plan.findOne({_id:id});
        console.log('user',plan);

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
    getPlanById
}