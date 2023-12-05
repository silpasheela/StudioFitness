const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
    getMyUsers,
    getMyTrainers,
    createTrainerConversation,
    createUserConversation,
    getMyChat,
} = require("../controllers/chatController");



router.get("/getusers", auth.authenticateToken, auth.isTrainer, getMyUsers);

router.get("/gettrainers", auth.authenticateToken, auth.isUser, getMyTrainers);

router.post(
    "/user/create/:trainerId",
    auth.authenticateToken,
    auth.isUser,
    createTrainerConversation
);

router.post(
    "/trainer/create/:userId",
    auth.authenticateToken,
    auth.isTrainer,
    createUserConversation
);

router.get("/mychat", auth.authenticateToken, getMyChat);

module.exports = router;
