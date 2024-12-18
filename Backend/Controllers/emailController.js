const SibApiV3Sdk = require('sib-api-v3-sdk');
require('dotenv').config();

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

const sendEmail = (req, res) => {
    const { to, subject, text } = req.body;
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = text;
    sendSmtpEmail.sender = { email: process.env.BREVO_EMAIL };
    sendSmtpEmail.to = [{ email: to }];

    apiInstance.sendTransacEmail(sendSmtpEmail)
        .then((data) => {
            console.log('Email sent successfully:', data);
            res.status(200).json({success:true,message:'Email sent successfully'});
        })
        .catch((error) => {
            console.error('Error sending email:', error);
            res.status(500).json({success:false,message:'failed to send email'});
        });
};

module.exports = sendEmail;
