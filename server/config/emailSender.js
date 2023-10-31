const nodemailer = require("nodemailer");
const { MYEmail, Mypassword } = require("../config/env");

function sendEmail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: MYEmail,
      pass: Mypassword,
    },
  });

  const mailOptions = {
    from: MYEmail,
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email sending failed:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

module.exports = { sendEmail };
