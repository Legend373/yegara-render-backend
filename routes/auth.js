const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  getMe,
  updateDetails,
  updatePassword,
  forgotPassword,
  resetPassword,
  activateAccount
} = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

router.post('/register', register);
// SIMPLE TEST ROUTE - Add this FIRST!
router.get('/ping', (req, res) => {
  res.json({ 
    message: 'Auth router is ALIVE!', 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV
  });
});
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', authenticate, getMe);
router.put('/updatedetails', authenticate, updateDetails);
router.put('/updatepassword', authenticate, updatePassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.put('/activate', authenticate, activateAccount);

module.exports = router;