const Admin = require('../models/adminModel');
const User = require('../models/userModel');
const Plan = require('../models/planModel')
const Trainer = require('../models/trainerModel');
const Service = require('../models/serviceModel');
const Appointment = require('../models/appointmentModel');
const Subscriptions = require('../models/subscriptionModel')
const {verifyPassword} = require('../utils/password');
const {loginValidation} = require('../utils/validation');
const {getToken} = require('../utils/token');
const {transporter} = require('../utils/emailHelper');


const adminLogIn = async(req,res) => {

    const {error} = loginValidation.validate(req.body);
    if(error) {
        return res.status(400).json({
            message: error.details[0]?.message
        })
    }

    const {email,password} = req.body;

    const adminExists = await Admin.findOne({email:email});

    if(adminExists) {
        const isPasswordMatch = await verifyPassword(password,adminExists.password);

        if(isPasswordMatch) {
            const token = await getToken(adminExists._id,email);
            adminExists.password=undefined;
            adminExists.token=token;
            console.log(token)
            console.log(adminExists.token)


            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }

            console.log(token)
            return res.status(200).cookie("token", token, options).json({
                admin: adminExists,
                message: 'Admin Login Successful',
            });
        }
        return res.status(400).json({
            message: 'Incorrect password'
        })
    }
    return res.status(404).json({
        message: `Admin doesn't exists`
    })
}


const adminLogOut = async(req,res) => {
    try {
        res.status(200).cookie('token',null,{
            expires: new Date(Date.now()),
            httpOnly: true
        })
        .json({
            message: 'Admin Logged out successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}


const adminDashboard = async(req,res) => {
    try {
        const adminExists = await Admin.findOne({_id:req.userId});
        adminExists.password = undefined;

        if(adminExists) {
            return res.status(200).json({
                admin:adminExists,
                message: 'Welcome to the admin dashboard'
            })
        }

        res.status(404).json({
            message: 'Admin not found'
        })

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

const getAllUsers = async(req,res) => {
    
    console.log("came");
    try {
        const users = await User.find({}, { password: 0 });

        if(users) {
            return res.status(200).json({
                users,
                message: `User details fetched successfully`
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


const getUser = async(req,res) => {
    const {id} = req.params;


    try {
        const user = await User.findOne({_id:id},{ password: 0 });
        console.log('user',user);

        if(user) {
            return res.status(200).json({
                user,
                message: `User details fetched successfully`
            })
        } 
        res.status(404).json({
            message:`User with id ${id} doesnot exist!`
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

const getAllTrainers = async(req,res) => {
    
    try {
        // const trainers = await Trainer.find({}, { password: 0 }).populate('service','service-_id');
        const trainers = await Trainer.find({}, { password: 0 })

        if(trainers) {
            return res.status(200).json({
                trainers,
                message: `Trainer details fetched successfully`
            })
        }
        res.status(404).json({
            message:'No Trainer data available!'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}


const getTrainer = async(req,res) => {
    const {id} = req.params;

    try {
        const trainer = await Trainer.findOne({_id:id},{ password: 0 });
        console.log('user',trainer);

        if(trainer) {
            return res.status(200).json({
                trainer,
                message: `Trainer details fetched successfully`
            })
        } 
        res.status(404).json({
            message:`Trainer with id ${id} doesnot exist!`
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

const editUser = async(req,res) => {
    const {id} = req.params;
    const {user} = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id,user,{
            new:true,
            upsert:true
        });
        res.status(200).json({
            message: 'User details updated successfully',
            user: updatedUser
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

const searchUser = async(req,res) => {

    console.log(req.body)
    const {searchData} = req.body;
    console.log(searchData)
    try {
        // const user = await User.find({email: new RegExp(searchData,'i')});
        const user = await User.find({ email: { $regex: new RegExp(searchData, 'i') } });
        // console.log(user)
        res.status(200).json({
            user
        })
    } catch (error) {
        res.status(404).json({
            message: 'No users found'
        })
    }
}

const blockUser = async(req,res) => {
    const {id} = req.params;
    console.log(id)
    try {
        const user = await User.findOne({_id:id});
        console.log("myuser",user.isActiveUser)
        user.isActive = !user.isActive;

        await user.save();

        console.log(user)
        res.status(200).json({
            user,
            message: 'User status updated successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}


const searchTrainer = async(req,res) => {

    console.log(req.body)
    const {searchData} = req.body;
    console.log(searchData)
    try {
        // const user = await User.find({email: new RegExp(searchData,'i')});
        const trainer = await Trainer.find({ email: { $regex: new RegExp(searchData, 'i') } });
        // console.log(user)
        res.status(200).json({
            trainer
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: 'No trainer found'
        })
    }
}

const blockTrainer = async(req,res) => {
    const {id} = req.params;
    console.log(id)
    try {
        const trainer = await Trainer.findOne({_id:id});
        trainer.isActive = !trainer.isActive;
        await trainer.save();

        console.log(trainer)
        res.status(200).json({
            trainer,
            message: 'Trainer status updated successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}


const verifyTrainerCertificate = async(req,res) => {

    const {id} = req.params;
    console.log(id);

    try {
        const trainer = await Trainer.findOne({_id:id});
        trainer.isAdminVerified = !trainer.isAdminVerified;
        await trainer.save();

        if(trainer.isAdminVerified) {
            res.status(200).json({
                trainer,
                message: 'Trainer verification done successfully'
            })
        }
        const mailOptions = {
            to: trainer.email,
            subject: 'Urgent: Action Required - Upload Your Certificate',
            text: `We hope this message finds you well. We want to remind you that as a valued member of our platform, your contributions are greatly appreciated.

            However, we noticed that you haven't uploaded your required certification document. This certification is essential for maintaining your active trainer status on our platform. To ensure the continued success of your training programs and to provide the best experience for our users, we kindly request that you upload your certificate at your earliest convenience.
            
            Failure to upload your certification document within 7 days will result in temporary suspension of your trainer account. This suspension will prevent you from offering your training services and accessing your account.
            
            To upload your certificate, please follow these steps:
            1. Log in to your account.
            2. Go to your profile settings.
            3. Locate the "Certificate Upload" section.
            4. Upload a scanned copy or a clear photo of your valid certification.
            5. Save your changes.
            
            If you face any issues or have questions regarding this process, please don't hesitate to contact our support team for assistance.
            
            We value your contribution to our platform, and we want to ensure that your trainer account remains active. Please take immediate action to upload your certificate, and your account will continue to be in good standing.`,
        };
        await transporter.sendMail(mailOptions);    

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}


const addService = async (req,res) => {

    const {service} = req.body;
    console.log("hey")
    if(!service) {
        console.log("hello")

        return res.status(400).json({
            message: 'Please fill out the required fields !'
        })
    }

    try {
        console.log("hemmm")

        const exists = await Service.findOne({service:service});
        if(exists) {
            return res.status(400).json({
                message: 'Service already exists !'
            })
        } else {
            const service = await Service.create({
                ...req.body,
                // service,
                // isActive:true
            })
            return res.status(201).json({
                service: service,
                message: 'Service added successfully'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}


const getAllServices = async(req,res) => {
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



// const deactivateService = async(req,res) => {
//     const {id} = req.params;
//     console.log(id)
//     try {
//         const service = await Service.findOne({_id:id});
//         Service.isActive = !Service.isActive;
//         await service.save();

//         console.log(service)
//         res.status(200).json({
//             service,
//             message: 'User status updated successfully'
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: 'Internal server error'
//         })
//     }
// }

const deactivateService = async (req, res) => {
    const { id } = req.params;

    try {
        const service = await Service.findOne({ _id: id });

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        service.isActive = !service.isActive;
        await service.save();

        res.status(200).json({
            service,
            message: 'Service status updated successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}



const addPlan = async (req,res) => {

    const {planName,planAmount} = req.body;
    console.log("hey")
    if(!planName || !planAmount ) {
        console.log("hello")

        return res.status(400).json({
            message: 'Please fill out the required fields !'
        })
    }

    try {
        console.log("hemmm")

        const exists = await Plan.findOne({planName:planName});
        if(exists) {
            return res.status(400).json({
                message: 'Plan already exists !'
            })
        } else {
            const plan = await Plan.create({
                ...req.body,
                // service,
                isActive:true
            })
            return res.status(201).json({
                plan: plan,
                message: 'Plan added successfully'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
} 



const getAllAppointments = async(req,res) => {
    console.log("serv out came");

    try {
        const appointments = await Appointment.find({});
        console.log("serv in came");
        if(appointments) {
            return res.status(200).json({
                appointments,
                message: `appointments fetched successfully`
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

//appointments pie chart

const getAppointmentStatusCounts = async (req, res) => {
    try {
    const aggregatePipeline = [
        {
        $group: {
            _id: '$isCancelled',
            count: { $sum: 1 },
        },
        },
        {
        $project: {
            _id: 0,
            status: '$_id',
            count: 1,
        },
        },
    ];

    const appointmentStatusCounts = await Appointment.aggregate(aggregatePipeline);

    res.status(200).json({
        appointmentStatusCounts,
        message: 'Appointment status counts fetched successfully',
    });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error',
        });
    }
};



const getAllSubscriptions = async(req,res) => {

    try {
        const subscriptions = await Subscriptions.find({});
        if(subscriptions) {
            return res.status(200).json({
                subscriptions,
                message: `subscriptions fetched successfully`
            })
        }
        res.status(404).json({
            message:'No subscriptions data available!'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}


const getTotalRevenue = async(req, res) => {
    try {
        const revenueByPlan = await Subscriptions.aggregate([
            {
                $match: {
                    paymentStatus: 'paid'
                }
            },
            {
                $addFields: {
                    amount: {
                        $toInt: '$amount' // or $toDouble if the amount is a floating point number
                    }
                }
            },
            {
                $group: {
                    _id: '$amount',
                    totalRevenue: {
                        $sum: '$amount'
                    },
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    plan: '$_id',
                    totalRevenue: 1,
                    count: 1
                }
            }
        ]);

        if (revenueByPlan) {
            return res.status(200).json({
                revenueByPlan,
                message: `Revenue by plan fetched successfully`
            });
        }

        res.status(404).json({
            message:'No subscriptions data available!'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};


const getTrainersByService = async (req, res) => {

    try {
        const groupedTrainers = await Trainer.aggregate([
            {
                $lookup: {
                    from: 'services', 
                    localField: 'service',
                    foreignField: '_id',
                    as: 'service'
                }
            },
            {
                $unwind: '$service'
            },
            {
                $group: {
                    _id: '$service._id',
                    serviceName: { $first: '$service.service' }, 
                    totalTrainers: { $sum: 1 },
                }
            },
            {
                $project: {
                    _id: 0,
                    service: {
                        _id: '$_id',
                        name: '$serviceName', 
                    },
                    totalTrainers: 1,
                }
            }
        ]);

        if (groupedTrainers && groupedTrainers.length > 0) {
            return res.status(200).json({
                groupedTrainers,
                message: 'Trainers grouped by service fetched successfully'
            });
        }

        res.status(404).json({
            message: 'No Trainer data available!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};













module.exports = {
    adminLogIn,
    adminLogOut,
    adminDashboard,
    getAllUsers,
    getAllTrainers,
    editUser,
    searchUser,
    blockUser,
    searchTrainer,
    blockTrainer,
    getUser,
    getTrainer,
    verifyTrainerCertificate,
    addService,
    getAllServices,
    deactivateService,
    addPlan,
    getAllAppointments,
    getAppointmentStatusCounts,
    getAllSubscriptions,
    getTotalRevenue,
    getTrainersByService,

}