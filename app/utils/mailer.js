const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let mailer = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE, // secure:true for port 465, secure:false for port 587
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});

// setup email data with unicode symbols
let defaultOptions = {
    from: process.env.MAIL_FROM, // sender address
    to: process.env.KINDLE_EMAIL_TO, // list of receivers
    subject: '', // Subject line
    text: '', // plain text body
    html: '' // html body
};


module.exports={
  sendEmail:(_options)=>{
    let options=Object.assign({}, defaultOptions, _options)
    mailer.sendMail(options, (error, info)=>{
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    })
  }
}
