const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.USER_MAIL, 
        pass: process.env.USER_PASSWORD        
    }
});

module.exports = transporter;