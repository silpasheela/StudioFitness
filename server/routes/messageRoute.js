const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
    sentMessage,
    recieveMessage,
} = require("../controllers/messageController");



router.post("/:chatId", auth.authenticateToken, sentMessage);
router.get("/:chatId", auth.authenticateToken, recieveMessage);




module.exports = router;
