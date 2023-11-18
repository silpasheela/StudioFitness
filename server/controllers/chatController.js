const Trainer = require('../models/trainerModel');
const User = require('../models/userModel');
const Chat = require('../models/chatModel')




const getMyUsers = async (req, res) => {
    const { search } = req.query;
    let query = {};

    // Check if a search query is provided
    if (search) {
        query = {
            $or: [
                {
                    'user.fullName': {
                        $regex: search,
                        $options: 'i',
                    },
                },
            ],
        };
    }
    // Use aggregate to perform a series of MongoDB operations
    const users = await Chat.aggregate([
        {
            $match: { 'participants.trainer': new mongoose.Types.ObjectId(req.userId) },
        },
        {
            $lookup: {
                from: 'trainers',
                localField: 'participants.trainer',
                foreignField: '_id',
                as: 'trainer',
            },
        },
        {
            $unwind: '$trainer',
        },
        {
            $lookup: {
                from: 'users',
                localField: 'participants.user',
                foreignField: '_id',
                as: 'user',
            },
        },
        {
            $unwind: '$user',
        },
        {
        $project: {
            trainerId: '$participants.trainer',
            userId: '$participants.user',
            user: 1,
        },
        },
        {
            $match: query,
        },
        {
        $project: {
                userId: 1,
                user: {
                fullName: 1,
                email: 1,
                profilePicture: 1,
                },
            },
        },
    ]);

    // Remove duplicate users
    const myUsers = [];
    const uniqueUserIds = new Set();

    users.forEach((user) => {
        if (!uniqueUserIds.has(user.userId.toString())) {
        uniqueUserIds.add(user.userId.toString());
        myUsers.push(user);
        }
    });

    res.status(200).json({ myUsers });
};














module.exports = {
    getMyUsers
}