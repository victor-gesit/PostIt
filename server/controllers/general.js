import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import models from '../models';

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

const User = models.User;
const Group = models.Group;

export default {
  // Load everyone registered on PostIt
  getallusers: (req, res) => {
    let offset = req.query.offset || 0;
    const limit = req.query.limit || 6;
    User.findAndCountAll({ attributes:
      ['id', 'firstName', 'lastName', 'email', 'phone'],
      order: [['firstName', 'ASC']],
      offset,
      limit })
      .then((allUsers) => {
        const allLoaded = Number(offset) + allUsers.rows.length;
        offset = Number(offset);
        res.status(200).send({ ...allUsers, allLoaded, offset });
      }).catch(() =>
        res.status(401).send({ success: false, message: 'Invalid query in url' }));
  },
  // Load everyone registered on PostIt
  searchForUsers: (req, res) => {
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 6;
    const searchQuery = req.query.searchQuery;
    User.findAndCountAll({ where: {
      $or: {
        firstName: {
          $iLike: `%${searchQuery}%`
        },
        lastName: {
          $iLike: `%${searchQuery}%`
        }
      }
    },
      attributes: ['id', 'firstName', 'lastName', 'email', 'phone'],
      order: [['firstName', 'ASC']],
      offset,
      limit })
      .then((users) => {
        res.status(200).send({ users, searchQuery });
      }).catch(() =>
        res.status(401).send({ success: false,
          message: 'Invalid query in url' }));
  },
  // Load all groups created
  getAllGroups: (req, res) => {
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 6;

    Group.findAndCountAll({ attributes:
      ['id', 'title', 'description', 'creatorEmail', 'createdBy', 'createdAt'],
      offset,
      limit })
      .then((allGroups) => {
        res.status(200).send(allGroups);
      }).catch(() =>
        res.status(401).send({ success: false, message: 'Invalid query in url' }));
  },
  receiveEmail: (req, res) => {
    const email = req.body.email || '';
    User.find({ where: { email } }).then((foundUser) => {
      if (foundUser) {
        const user = {
          email: foundUser.email
        };
        const token = jwt.sign(user, jwtSecret, {
          expiresIn: 600 // expires in 10 minutes
        });
        const mailOptions = {
          from: process.env.EMAIL_USERNAME,
          to: email,
          subject: 'Password Reset',
          html: `<div style="text-align: center">
            <img src="http://res.cloudinary.com/gesit/image/upload/v1503911318/logo_ietvz2.png"/>
            </div>
            <h2 style="color: #c51162;">You have requested  a password reset on your PostIt Account</h2>
            <h2>
            <a href="http://postit-api-victor.herokuapp.com/#/newpassword/${token}">
            Click here</a> to reset your password</h2>
            <br/><br/>This link is valid for 10 minutes
            <p>If the password reset was not requested by you, ignore this mail and send a 
            complaint to postitnotify@gmail.com</p>`
        };
        const transporter = nodemailer.createTransport({
          service: process.env.EMAIL_SERVICE,
          auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
          }
        });
        transporter.sendMail(mailOptions, (error) => {
          if (error) {
            return res.status(500).send({
              success: false,
              message: 'Could not send email. Check your internet connection'
            });
          }
          return res.status(202).send({ success: true,
            message: 'A password reset link has been sent to your email' });
        });
      } else {
        return res.status(404).send({ success: false,
          message: 'Email not associated with any account' });
      }
    }).catch(() =>
      res.status(401).send({ success: false,
        message: 'Please specify an email' }));
  },
  resetPassword: (req, res) => {
    const passwordToken = req.body.token ||
      req.query.token || req.headers['x-access-token'];
    const newPassword = req.body.newPassword;
    if (!newPassword) {
      return res.status(401).send({ success: false,
        message: 'Specify a new password' });
    }
    if (passwordToken) {
      jwt.verify(passwordToken, jwtSecret, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: 'Expired or invalid token',
            error: err });
        }
        const email = decoded.email;
        User.find({ where: { email } }).then((user) => {
          user.password = newPassword;
          user.save().then((updatedUser) => {
            const userDetails = {
              firstName: updatedUser.firstName,
              lastName: updatedUser.lastName,
              email: updatedUser.email,
              phone: updatedUser.phone,
              id: user.id
            };
            const token = jwt.sign(userDetails, jwtSecret, {
              expiresIn: '2 days' // expires in 48 hours
            });
            return res.status(202).send({ success: true,
              user: userDetails,
              token,
              message: 'Password changed successfully' });
          });
        });
      });
    } else {
      return res.status(401).send({ message: 'No token provided',
        success: false });
    }
  }
};
