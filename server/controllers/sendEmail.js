import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

export default (groupInfo, groupMembers, message) => {
  const mailListUnfiltered = groupMembers.map((groupMember) => {
    return groupMember.email;
  });
  const mailList = mailListUnfiltered.filter((email) => {
    return email;
  });
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: mailList,
    subject: `Unread message in ${groupInfo.title}`,
    html: `<p>You have a new message in <b>${groupInfo.title}</b><p/><br/><b>Sender:
     <b/>${message.sentBy}<br/><b>Message: </b> ${message.body}<br/>
     <a href="http://postit-api-victor.herokuapp.com/#/postmessage/${groupInfo.id}">
     Click here</a> to go to PostIt page`
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
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};
