const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (to, subject, content) => {
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    var mailOptions = {
      from: to,
      to: process.env.EMAIL_USER,
      subject,
      text: content,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log("Error while sending email : ", error);
    return error;
  }
};

module.exports = sendEmail;
