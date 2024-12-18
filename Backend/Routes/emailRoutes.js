const express = require('express');
const router = express.Router();
const sendEmail = require('../Controllers/emailController');

router.route('/sendEmail')
    .post(sendEmail);

module.exports = router;