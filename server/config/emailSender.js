const nodemailer = require('nodemailer');

function sendEmail(to, subject, text) {
    const transporter = nodemailer.createTransport({
        // Configure your email service here (e.g., Gmail, SMTP, etc.)
        service: 'Gmail',
        auth: {
            user: 'your_email@gmail.com',
            pass: 'your_email_password',
        },
    });

    const mailOptions = {
        from: 'your_email@gmail.com',
        to: to,
        subject: subject,
        text: text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Email sending failed:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

module.exports = { sendEmail };
