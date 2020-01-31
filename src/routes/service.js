const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

const pool = require('../database');

router.get('/contact', (req, res) => {
    res.render('email/contact');
});

router.post('/contact/send', async (req, res) => {
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${req.body.fullname}</li>
      <li>Email: ${req.body.email}</li>
      <li>Subject: ${req.body.subject}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.msg}</p>
    `;
     
// Use Gmail service to create transport object 
  let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
      }
  });

// Send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"MyPortfolio Contact" <${process.env.EMAIL}>`, // sender address
    to: "drmpgaspar@gmail.com", // list of receivers
    replyTo: `${req.body.email}`,
    subject: "Portfolio Contact Request", // Subject line
    html: output // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.render('email/contact', {msg:'Email has been sent'});

});

module.exports = router;


// Create reusable transporter object using the default SMTP transport
 /*let transporter = nodemailer.createTransport({
    host: "smtp.umbler.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'test@mgaspar.com', // generated ethereal user
      pass: '123abc' // generated ethereal password
    },
    tsl:{
        rejectUnauthorized: false;
    }
  });*/