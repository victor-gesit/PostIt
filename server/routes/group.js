import dotenv from 'dotenv';
import models from '../models';

const Group = models.Group;
const User = models.User;
const Message = models.Message;

dotenv.config();

export default {
  // Create a group
  create: (req, res) => {
    Group.build({
      createdBy: 'victor4l@yahoo.com',
      title: req.body.title,
      description: req.body.description,
    }).save().then((createdGroup) => {
      res.send(createdGroup);
    });
  },
  // Add a user to a group
  adduser: (req, res) => {
    const groupId = req.params.id;
    const newUserEmail = req.body.email;
    Group.find({ where: { id: groupId } }).then((foundGroup) => {
      User.find({ where: { email: newUserEmail } }).then((foundUser) => {
        foundGroup.addUser(foundUser).then((addedUser) => {
          res.send(addedUser);
        });
      }).catch(() => {
        res.send({ error: 'User not found' });
      });
    }).catch(() => {
      res.send({ error: 'Group not found' });
    });
  },
  // Post a message to a group
  postmessage: (req, res) => {
    const groupId = req.params.id;
    const sentBy = req.body.sender;
    const messageBody = req.body.message;
    Group.find({ where: { id: groupId } }).then((foundGroup) => {
      Message.build({
        sentBy,
        body: messageBody,
        groupId
      }).save().then((createdMessage) => {
        foundGroup.addMessage(createdMessage).then((addedMessage) => {
          res.send(addedMessage);
        });
      }).catch((err) => {
        res.send(err);
      });
    }).catch(() => {
      res.send({ error: 'Group not found' });
    });
  },
  // Load messages from a particular group
  getmessages: (req, res) => {
    const groupId = req.params.id;
    Group.find({ where: { id: groupId } }).then((foundGroup) => {
      foundGroup.getMessages().then((groupMessages) => {
        res.send(groupMessages);
      });
    }).catch(() => {
      res.send({ error: 'Group not found' });
    });
  },
  // Get the list of members in a particular group
  getmembers: (req, res) => {
    const groupId = req.params.id;
    Group.find({ where: { id: groupId } }).then((foundGroup) => {
      foundGroup.getUsers().then((groupMembers) => {
        res.send(groupMembers);
      });
    }).catch(() => {
      res.send({ error: 'Group not found' });
    });
  }
};
