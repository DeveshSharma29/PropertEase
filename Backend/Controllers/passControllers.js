const userModel = require('../Models/userModel');
const generateToken = require('../utils');
const SibApiV3Sdk = require('sib-api-v3-sdk');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "helloWorld";
const bcrypt = require('bcrypt');

require('dotenv').config();

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

const sendPasswordResetEmail = async (to, subject, htmlContent) => {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = htmlContent;
    sendSmtpEmail.sender = { email: process.env.BREVO_EMAIL };
    sendSmtpEmail.to = [{ email: to }];

    try {
        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
        if (data && data.messageId) {
            console.log('Email sent successfully:', data);
            return true; // Success
        } else {
            console.error('Email response does not confirm success:', data);
            return false; // Failed
        }
    } catch (error) {
        console.error('Error sending email:', error);
        return false; // Failed
    }
};


const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const token = await generateToken(user.email, user._id);

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; 
        await user.save();

        const frontendURL = process.env.FRONTEND_URL.replace(/\/+$/, '');
        const resetURL = `${frontendURL}/reset-password/${token}`;

        const emailContent = `
            <p>You requested a password reset. Click the link below to reset your password:</p>
            <a href="${resetURL}">${resetURL}</a>
            <p>If you didn't request this, please ignore this email.</p>
        `;

        const sent = await sendPasswordResetEmail(email, 'Password Reset', emailContent);


        if(!sent){
            res.status(400).json({success:false, message: 'failed to send password reset email' });
        }
        res.status(200).json({success:true, message: 'Password reset email sent successfully' });
    } catch (error) {
        console.error('Error in forgotPassword:', error);
        res.status(500).json({success:false, message: 'Server error' });
    }
};

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    let decoded;
    try {
        decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(400).json({ success: false, message: 'Invalid or expired token' });
    }

    try {
        const user = await userModel.findOne({
            _id: decoded._id,
            email: decoded.email,
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            console.error('User not found or token expired');
            return res.status(400).json({ success: false, message: 'Invalid or expired token' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        user.password = hashedPassword;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ success: true, message: 'Password reset successful' });
    } catch (error) {
        console.error('Error during resetPassword:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
module.exports = { forgotPassword, resetPassword };
