const Conversation = require("../models/conversationModel");
const Appointment = require("../models/appointmentModel");
const Trainer = require("../models/trainerModel");
const User = require("../models/userModel");

const mongoose = require("mongoose");

const getMyUsers = async (req, res) => {
  const { search } = req.query;
  let query = {};
  if (search) {
    query = {
      $or: [
        {
          "user.fullName": {
            $regex: search,
            $options: "i",
          },
        },
      ],
    };
  }
  const users = await Appointment.aggregate([
    {
      $match: { trainerId: new mongoose.Types.ObjectId(req.userId) },
    },
    {
      $lookup: {
        from: "trainers",
        localField: "trainerId",
        foreignField: "_id",
        as: "trainer",
      },
    },
    {
      $unwind: {
        path: "$trainer",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: {
        path: "$user",
      },
    },
    {
      $project: {
        trainer: 1,
        user: 1,
        trainerId: 1,
        userId: 1,
      },
    },
    {
      $match: query,
    },
    {
      $project: {
        trainerId: 1,
        userId: 1,
        user: 1,
        _id: 1,
        user: {
          //   name: 1,
          fullName: 1,
          email: 1,
          profilePicture: 1,
        },
      },
    },
  ]);

  // for removing the duplicates of patients
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

const getMyTrainers = async (req, res) => {
  const { search } = req.query;
  let query = {};
  if (search) {
    query = {
      $or: [
        {
          "trainer.fullName": {
            $regex: search,
            $options: "i",
          },
        },
      ],
    };
  }
  const trainers = await Appointment.aggregate([
    {
      $match: { userId: new mongoose.Types.ObjectId(req.userId) },
    },
    {
      $lookup: {
        from: "trainers",
        localField: "trainerId",
        foreignField: "_id",
        as: "trainer",
      },
    },
    {
      $unwind: {
        path: "$trainer",
      },
    },
    {
      $match: query,
    },
    {
      $project: {
        trainerId: 1,
        userId: 1,
        user: 1,
        trainer: {
          //   name: 1,
          fullName: 1,
          email: 1,
          profilePicture: 1,
        },
      },
    },
  ]);

  const myTrainers = [];
  const uniqueTrainerIds = new Set();

  trainers.forEach((trainer) => {
    if (!uniqueTrainerIds.has(trainer.trainerId.toString())) {
      uniqueTrainerIds.add(trainer.trainerId.toString());
      myTrainers.push(trainer);
    }
  });

  res.json({ myTrainers });
};

const createTrainerConversation = async (req, res) => {
  {
    try {
      const { trainerId } = req.params;

      const trainer = await Trainer.findById(trainerId);
      const user = await User.findById(req.userId);

      if (!trainer || !user) {
        return res.status(404).json({ error: "trainer or user not found" });
      }

      // Check if the conversation already exists
      let conversation = await Conversation.findOne({
        "participants.trainer": trainerId,
        "participants.user": req.userId,
      });

      if (conversation) {
        await conversation.populate([
          {
            path: "participants.user",
            select: "profilePicture fullName",
          },
          {
            path: "participants.trainer",
            select: "profilePicture fullName",
          },
        ]);

        return res.status(200).json(conversation);
      }

      conversation = new Conversation({
        participants: [{ trainer: trainerId, user: req.userId }],
      });

      await conversation.save();

      await conversation.populate("participants.trainer participants.user");

      res.status(201).json(conversation);
    } catch (error) {
      res.status(500).json({ error: "Failed to create conversation" });
    }
  }
};

const createUserConversation = async (req, res) => {
  {
    try {
      const { userId } = req.params;

      const trainer = await Trainer.findById(req.userId);
      const user = await User.findById(userId);

      if (!trainer || !user) {
        return res.status(404).json({ error: "Trainer or user not found" });
      }

      // Check if the conversation already exists
      let conversation = await Conversation.findOne({
        "participants.trainer": req.userId,
        "participants.user": userId,
      });

      if (conversation) {
        await conversation.populate([
          {
            path: "participants.user",
            select: "profilePicture fullName",
          },
          {
            path: "participants.trainer",
            select: "profilePicture fullName",
          },
        ]);

        return res.status(200).json(conversation);
      }

      conversation = new Conversation({
        participants: [{ trainer: req.userId, user: userId }],
      });

      await conversation.save();

      await conversation.populate([
        {
          path: "participants.user",
          select: "profilePicture fullName email",
        },
        {
          path: "participants.trainer",
          select: "profilePicture fullName email",
        },
      ]);

      res.status(201).json(conversation);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to create conversation" });
    }
  }
};

const getMyChat = async (req, res) => {
  try {
    const loggedInUserId = new mongoose.Types.ObjectId(req.userId);

    const conversations = await Conversation.find({
      participants: {
        $elemMatch: {
          $or: [{ trainer: loggedInUserId }, { user: loggedInUserId }],
        },
      },
    }).populate([
      {
        path: "participants.trainer",
        select: "profilePicture fullName email",
      },
      {
        path: "participants.user",
        select: "profilePicture fullName email",
      },
      {
        path: "latestMessage",
      },
    ]);

    if (conversations.length === 0) {
      return res.status(404).json({ error: "No conversations found" });
    }

    return res.status(200).json(conversations);
  } catch (error) {
    return res
      .status(500)
      .json({ errorInfo: "Failed to retrieve conversations" });
  }
};

module.exports = {
    getMyUsers,
    getMyTrainers,
    createTrainerConversation,
    createUserConversation,
    getMyChat,
};
