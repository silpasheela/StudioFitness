const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const trainerController = require('../controllers/trainerController');
const videoController = require('../controllers/videoController');
const multer = require('multer');
const upload = multer();



router.post('/signup',trainerController.trainerSignUp);
router.put('/verify/:token',trainerController.trainerEmailVerification);
router.post('/login',auth.isTrainer,trainerController.trainerSignIn);
router.get('/logout',trainerController.trainerLogOut);
router.get('/dashboard',auth.authenticateToken,auth.isTrainer,trainerController.trainerDashboard);
router.put('/reset-password',trainerController.trainerPasswordReset)
router.put('/new-password',trainerController.trainerNewPassword)

router.put('/editprofile/:id',auth.authenticateToken,auth.isTrainer,trainerController.trainerProfileUpdate);
router.put('/editimage/:id',auth.authenticateToken,auth.isTrainer,trainerController.trainerProfilePictureEdit);
router.get('/all-services',auth.authenticateToken,trainerController.trainerGetAllServices);

router.post('/addslot',auth.authenticateToken,auth.isTrainer,trainerController.trainerAddSlot);
router.get('/view-slots',auth.authenticateToken,auth.isTrainer,trainerController.trainerGetSlots);
router.put('/slot-update/:slotId',auth.authenticateToken,auth.isTrainer,trainerController.trainerUpdateSlot);
router.delete('/delete-slot/:slotId',auth.authenticateToken,auth.isTrainer,trainerController.trainerDeleteSlot);
router.delete('/slots/delete-by-date/:dateId',auth.authenticateToken,auth.isTrainer,trainerController.trainerDeleteSlotsByDateId);
router.get('/view-appointments',auth.authenticateToken,auth.isTrainer,trainerController.trainerGetAppointments);
router.put('/approve-appointment/:appointmentId',auth.authenticateToken,auth.isTrainer,trainerController.trainerApproveAppointment);
router.put('/reject-appointment/:appointmentId',auth.authenticateToken,auth.isTrainer,trainerController.trainerRejectAppointment);


router.get(
    "/view-appointments/:id",
    auth.authenticateToken,
    //   auth.isTrainer,
    trainerController.getAppointmentDetails
);


router.post('/upload-class', auth.authenticateToken, auth.isTrainer, upload.array('video', 1), videoController.trainerUploadVideo);
router.get('/view-uploads',auth.authenticateToken,auth.isTrainer,videoController.trainerGetVideos);



module.exports = router