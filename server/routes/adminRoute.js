const express = require('express')
const router = express.Router();
const auth = require('../middleware/authMiddleware')
const adminController = require('../controllers/adminController')


router.post('/login',adminController.adminLogIn);
router.get('/logout',adminController.adminLogOut);
router.get('/dashboard',auth.authenticateToken,auth.isAdmin,adminController.adminDashboard);
router.get('/all-users',auth.authenticateToken,auth.isAdmin,adminController.getAllUsers);
router.get('/all-trainers',auth.authenticateToken,auth.isAdmin,adminController.getAllTrainers);
router.put('/edit-user/:id',auth.authenticateToken,auth.isAdmin,adminController.editUser);
router.post('/search-user',auth.authenticateToken,auth.isAdmin,adminController.searchUser);
router.put('/block-user/:id',auth.authenticateToken,auth.isAdmin,adminController.blockUser);
router.get('/user/:id',auth.authenticateToken,auth.isAdmin,adminController.getUser);
router.post('/search-trainer',auth.authenticateToken,auth.isAdmin,adminController.searchTrainer);
router.put('/block-trainer/:id',auth.authenticateToken,auth.isAdmin,adminController.blockTrainer);
router.get('/trainer/:id',auth.authenticateToken,auth.isAdmin,adminController.getTrainer);
router.put('/verify-trainer/:id',auth.authenticateToken,auth.isAdmin,adminController.verifyTrainerCertificate);
router.post('/add-service',auth.authenticateToken,auth.isAdmin,adminController.addService);
router.get('/all-services',auth.authenticateToken,auth.isAdmin,adminController.getAllServices);
router.put('/deactivate-service/:id',auth.authenticateToken,auth.isAdmin,adminController.deactivateService);








module.exports = router