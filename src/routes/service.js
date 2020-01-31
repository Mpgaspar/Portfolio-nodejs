const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const pool = require('../database');

router.get('/contact', (req, res) => {
    res.render('email/contact');
});

router.post('/contact/send', (req, res) => {
    //console.log(req.body);
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${req.body.fullname}</li>
      <li>Email: ${req.body.email}</li>
      <li>Subject: ${req.body.subject.value}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.msg}</p>
    `;
     
// create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "localhost",
    port: 3333,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'test@mgaspar.com', // generated ethereal user
      pass: '123abc' // generated ethereal password
    }
  });

// send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"MyPortfolio Contact" <test@mgaspar.com>', // sender address
    to: "drmpgaspar@gmail.com", // list of receivers
    subject: "Portfolio Contact Request", // Subject line
    text: "Hello world?", // plain text body
    html: output // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.render('email/contact', {msg:'Email has been sent'});
}

main().catch(console.error);
});


module.exports = router;