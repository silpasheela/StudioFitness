const Trainer = require('../models/trainerModel');
const Service = require('../models/serviceModel');
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

        const verificationLink = `http://localhost:3000/verify?emailVerificationToken=${emailVerificationToken}`;

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
        // console.log("hey",trainerExists)
        if(trainerExists) {
            const token = await getToken(trainerExists._id,email);
            // console.log(token)

            trainerExists.resetPasswordToken = token;
            // console.log(userExists)
            await trainerExists.save();
            // console.log(token)
            // console.log(userExists.resetPasswordToken)
            
            const passwordResetLink = `http://localhost:3000/trainer/reset-password-token/${token}`;

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
    // const {token} = req.params;
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


// const trainerProfileUpdate = async(req,res) => {

//     // const {error} = trainerProfileUpdateValidation.validate(req.body);
//     // if(error) {
//     //     return res.status(400).json({
//     //         message: error.details[0]?.message,
//     //     });        
//     // }
//     const {mobileNumber,street,city,state,zip,qualification,service} = req.body
//     try {
//         const updateInfo = await Trainer.findOne({_id:req.userId})

//         if(!updateInfo) {
//             return  res.status(404).json({
//                 message: `Trainer doesn't exist`
//             })
//         }
//         upload.single('profilePicture')(req,res,async(error) => {
//             try {
//                 if(error) {
//                     return res.status(500).json({
//                         message: 'Image upload error'
//                     });
//                 }
//                 if(req.file) {
//                     // const trainerProfilePicture = await cloudinary.uploader.upload(req.file.path,{folder:'Trainers'});
//                     // updateInfo.profilePicture = trainerProfilePicture.secure_url;
//                     // console.log(trainerProfilePicture)     
                    
//                     const trainerCertificate = await cloudinary.uploader.upload(req.file.path);
//                     updateInfo.profilePicture = trainerCertificate.secure_url;
//                     console.log(trainerCertificate)
//                 }

//                 updateInfo.mobileNumber = mobileNumber;
//                 updateInfo.street = street;
//                 updateInfo.city = city;
//                 updateInfo.state = state;
//                 updateInfo.zip = zip;
//                 updateInfo.qualification = qualification;
//                 updateInfo.service = service;

//                 await updateInfo.save();

//                 res.status(200).json({
//                     message: 'Profile updated successfully',
//                     updateInfo
//                 });
//             } catch (error) {
//                 return res.status(500).json({
//                     message: 'Error in updating trainer data'
//                 });
//             }
//         })
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             message: 'Internal server error'
//         });
//     }
// }



const trainerProfileUpdate = async(req,res) => {

    console.log("my req",req.body)
    
    const {error} = trainerProfileUpdateValidation.validate(req.body);
    if(error) {
        console.log(error)
        return res.status(400).json({
            message: error.details[0]?.message,
        });        
    }
    console.log(req.userId);
    try {
        
        const updateData = await Trainer.findOne({_id:req.userId})

        console.log("updateData",updateData)

        if(!updateData) {
            return  res.status(404).json({
                message: `User doesn't exist`
            })
        }
        console.log("outside single");
        console.log("my req outside single",req.body)


        upload.single('certificate')(req,res,async(error) => {
            console.log("inside single");
            try {
                if(error) {
                    return res.status(500).json({
                        message: 'Certificate upload error'
                    });
                }
                if(req.file) {
                    const trainerCertificate = await cloudinary.uploader.upload(req.file.path);
                    req.body.certificate = trainerCertificate.secure_url;
                    // console.log(userProfilePicture)
                }
                const projection = { password:0,email:0,role:0,emailVerificationToken:0,isEmailVerified:0,resetPasswordToken:0,isActive:0,__v:0 };
                
                const updateInfo = await Trainer.findByIdAndUpdate(req.userId,req.body,{ new: true, runValidators: true, projection })
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
                const updateInfo = await Trainer.findByIdAndUpdate(req.userId,updateData,{ new: true, runValidators: true, projection })
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
        console.log(error)
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}


const trainerGetAllServices = async(req,res) => {
    console.log("serv out came");

    try {
        const services = await Service.find({});
        console.log("serv in came");
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
}