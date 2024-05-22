const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const mailer = async (email,subject,body)=> {
  const info = await transporter.sendMail({
    from: '"BLOG MGMT 👻" <sutarkeshab123@gmail.com>', 
    to: email, 
    subject,  
    html: `<b>${body}</b>`,
  });

  return info.messageId;

  
};

module.exports = {mailer};