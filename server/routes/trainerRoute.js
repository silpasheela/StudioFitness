const express = require('express')
const router = express.Router();
const auth = require('../middleware/authMiddleware')
const trainerController = require('../controllers/trainerController')


router.post('/signup',trainerController.trainerSignUp);
router.put('/verify/:token',trainerController.trainerEmailVerification);
router.post('/login',auth.isTrainer,trainerController.trainerSignIn);
router.get('/logout',trainerController.trainerLogOut);
router.get('/dashboard',auth.authenticateToken,auth.isTrainer,trainerController.trainerDashboard);
router.put('/reset-password',trainerController.trainerPasswordReset)
router.put('/new-password',trainerController.trainerNewPassword)
// router.patch('/editprofile/:id',auth.authenticateToken,auth.isTrainer,trainerController.trainerProfileUpdate);

router.put('/editprofile/:id',auth.authenticateToken,auth.isTrainer,trainerController.trainerProfileUpdate);
router.put('/editimage/:id',auth.authenticateToken,auth.isTrainer,trainerController.trainerProfilePictureEdit);
router.get('/all-services',auth.authenticateToken,trainerController.trainerGetAllServices);



module.exports = router