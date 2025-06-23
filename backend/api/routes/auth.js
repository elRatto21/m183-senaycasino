const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { authValidation } = require('../middleware/validation')
const router = express.Router();

router.post('/register', authValidation.register, registerUser);
router.post('/login', authValidation.login, loginUser);

module.exports = router;
