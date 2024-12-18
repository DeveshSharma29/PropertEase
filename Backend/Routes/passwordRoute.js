const express = require('express');
const router = express.Router();
const {forgotPassword,resetPassword} = require('../Controllers/passControllers');

router.route('/forgot')
    .post(forgotPassword);
router.route('/reset/:token')
    .post(resetPassword);

module.exports = router;