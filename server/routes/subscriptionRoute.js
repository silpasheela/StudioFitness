const express = require('express')
const router = express.Router();
const auth = require('../middleware/authMiddleware')
const userController = require('../controllers/userController')
const subscriptionController = require('../controllers/subscriptionController')


// router.post('/user/create-subscription', auth.authenticateToken,auth.isUser,subscriptionController.createSubscription);

















module.exports = router