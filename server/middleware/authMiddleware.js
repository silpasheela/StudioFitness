const Admin = require('../models/adminModel');
const User = require('../models/userModel');
const Trainer = require('../models/trainerModel');
const {verifyToken} = require('../utils/token');


const authenticateToken = (req,res,next) => {

    const authToken = req.headers['authorization']?.replace('Bearer ','') || req.cookies.token;
    // console.log("one",authToken)

    if(!authToken) {
        return res.status(401).json({
            message: 'Access denied, token missing'
        })
    }
    try {
        const decoded = verifyToken(authToken);
        console.log("two",decoded)
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid Token"
        })
    }
}

// const isUser = async(req,res,next) => {
//     try {
//         // console.log("hei",req._id)
//         const {email} = req.body
//         // console.log("heyy",req.headers)
//         // console.log(req.userId)
//         const user = await User.findOne({ $or: [{ email: email }, { _id: req.userId }] });
//         // console.log("hellooo",user)
//         if(user.isActive) {
//             next();
//         }
//         else {
//             return res.status(400).json({
//                 message: "You are not authorized to access this resource"
//             })
//         }
//     } catch (error) {
//         return res.status(500).json({
//             message: "Internal Server error"
//         })
//     }
// }

const isUser = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ $or: [{ email: email }, { _id: req.userId }] });

        if (user) {
            if (user.isActive) {
                next();
            } else {
                return res.status(400).json({
                    message: "You are not authorized to access this resource"
                });
            }
        } else {
            return res.status(404).json({
                message: "Invalid user credentials!"
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server error"
        });
    }
}


const isAdmin = async(req,res,next) => {
    try {
        const admin = await Admin.findOne({id:req.userId});
        if(admin) {
            next();
        }
        else {
            return res.status(400).json({
                message: "Your account has been temporarily suspended!"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server error"
        })
    }
}

// const isTrainer = async(req,res,next) => {
//     try {
//         const {email} = req.body;
//         const trainer = await Trainer.findOne({ $or: [{ email: email }, { _id: req.userId }] });
//         if(trainer.isActive) {
//             next();
//         }
//         else {
//             return res.status(400).json({
//                 message: "You are not authorized to access this resource"
//             })
//         }
//     } catch (error) {
//         return res.status(500).json({
//             message: "Internal Server error"
//         })
//     }
// }


const isTrainer = async (req, res, next) => {
    try {
        const { email } = req.body;
        const trainer = await Trainer.findOne({ $or: [{ email: email }, { _id: req.userId }] });

        if (trainer) {
            if (trainer.isActive) {
                next();
            } else {
                return res.status(400).json({
                    message: "Your account has been temporarily suspended!"
                });
            }
        } else {
            return res.status(404).json({
                message: "Invalid trainer credentials!"
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server error"
        });
    }
}


module.exports = {
    authenticateToken,
    isUser,
    isAdmin,
    isTrainer
}