const express = require('express')
const router = express.Router();
const auth = require('../middleware/authMiddleware')
const chatController = require('../controllers/chatController')



router.get('/getUsers', auth.authenticateToken, auth.isTrainer, chatController.getMyUsers);
// router.get('/getTrainers', auth.authenticateToken, auth.isUser, getMyTrainers )















module.exports = router