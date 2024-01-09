const express = require('express');
const router = express.Router();

const authController = require('../controller/authController');
const validasiAuthInput = require('../config/middleware/validation_input/validation_input_auth');


router.post('/register', validasiAuthInput.validateAuthInpRegis, authController.registerAuth);
router.post('/login', validasiAuthInput.validateAuthInpLogin, authController.Login);
module.exports = router;