import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

export default (groupInfo, groupMembers, message, done) => {
  const mailListUnfiltered = groupMembers.map(groupMember =>
    groupMember.email);
  const mailList = mailListUnfiltered.filter(email =>
    email);
  const mailOptions = {
    from: 'PostIt Notifications',
    to: mailList,
    subject: `Unread message in ${groupInfo.title}`,
    html: `<div style="text-align: center">
      <img src="http://res.cloudinary.com/gesit/image/upload/v1503911318/logo_ietvz2.png"/>
      </div>
      <h2 style="color: #c51162;">You have a new message in <b>${groupInfo.title}</b></h2><br/>
      <b>Sender:</b> ${message.sentBy}<br/>
      <b>Message: </b> ${message.body}<br/>
      <h2>
      <a href="http://postit-api-victor.herokuapp.com/#/postmessage/${groupInfo.id}">
      Click here</a> to go to the PostIt page</h2>`
  };
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      done(error);
    } else {
      console.log(`Email sent: ${info.response}`);
      done(null, 'Email sent');
    }
  });
};
