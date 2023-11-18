require('../utils/googleStrategy')
require('../utils/jwtStrategy')
const express = require('express')
const router = express.Router();
const auth = require('../middleware/authMiddleware')
const userController = require('../controllers/userController')
const subscriptionController = require('../controllers/subscriptionController')
const passport = require('passport')


router.use(passport.initialize());


router.post('/signup',userController.userSignUp);
router.put('/verify/:token',userController.userEmailVerification);
router.post('/login',auth.isUser,userController.userSignIn);
router.get('/logout',userController.userLogOut);
router.get('/dashboard',auth.authenticateToken,auth.isUser,userController.userDashboard);
router.put('/reset-password',userController.userPasswordReset);
router.put('/new-password',userController.userNewPassword);

router.put('/editprofile/:id',auth.authenticateToken,auth.isUser,userController.userProfileUpdate);
router.put('/editimage/:id',auth.authenticateToken,auth.isUser,userController.userProfilePictureEdit);
router.get('/view-trainers',auth.authenticateToken,auth.isUser,userController.userGetAllTrainers);
router.get('/trainer/:id',auth.authenticateToken,auth.isUser,userController.userGetTrainer);

router.post('/create-subscription', auth.authenticateToken,auth.isUser,subscriptionController.createSubscription);
router.get('/subscription/:userId',auth.authenticateToken,auth.isUser,subscriptionController.getSubscription);
router.put('/subscription/cancel/:userId',auth.authenticateToken,auth.isUser,subscriptionController.cancelSubscription);
router.get('/view-plans',userController.getAllPlans);
router.get('/plan/:id',userController.getPlanById);


router.get('/view-slots/:trainerId',auth.authenticateToken,auth.isUser,userController.userGetSlots);
router.post('/book-appointment/:trainerId',auth.authenticateToken,auth.isUser,userController.userBookAppointment);
router.get('/view-appointments',auth.authenticateToken,auth.isUser,userController.userGetAppointments);
router.put('/cancel-appointment/:appointmentId',auth.authenticateToken,auth.isUser,userController.userCancelAppointment);









//google authentication

router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
)

router.get("/auth/google/callback", userController.googleAuthenticate)

router.get("/auth/google/failure", userController.failedGoogleAuthentication)

module.exports = router