const nodemailer = require('nodemailer');


const sendEmail = (recipientEmail) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tasyahestiaangesti@gmail.com',
      pass: process.env.password_nodemailer_gmail,
    },
  });

  const mailOptions = {
    from: 'tasyahestia@gmail.com',
    to: recipientEmail,
    subject: "Terima Kasih Telah mendaftar",
    text: "welcome, selamat anda berhasil register di Spooncular, enjoying your recipes",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = sendEmail;