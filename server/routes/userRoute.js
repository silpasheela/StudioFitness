require('../utils/googleStrategy')
require('../utils/jwtStrategy')
const express = require('express')
const router = express.Router();
const auth = require('../middleware/authMiddleware')
const userController = require('../controllers/userController')
const passport = require('passport')


router.use(passport.initialize());


router.post('/signup',userController.userSignUp);
router.put('/verify/:token',userController.userEmailVerification);
router.post('/login',auth.isUser,userController.userSignIn);
router.get('/logout',userController.userLogOut);
router.get('/dashboard',auth.authenticateToken,auth.isUser,userController.userDashboard);
router.put('/reset-password',userController.userPasswordReset);
// router.put('/new-password/:token',userController.userNewPassword);
router.put('/new-password',userController.userNewPassword);

router.put('/editprofile/:id',auth.authenticateToken,auth.isUser,userController.userProfileUpdate);
router.put('/editimage/:id',auth.authenticateToken,auth.isUser,userController.userProfilePictureEdit);
router.get('/view-trainers',auth.authenticateToken,auth.isUser,userController.userGetAllTrainers);
router.get('/trainer/:id',auth.authenticateToken,auth.isUser,userController.userGetTrainer);









//google authentication

router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
)

router.get("/auth/google/callback", userController.googleAuthenticate)

router.get("/auth/google/failure", userController.failedGoogleAuthentication)

module.exports = router