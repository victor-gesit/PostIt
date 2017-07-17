import dotenv from 'dotenv';
import models from '../models';

const Group = models.Group;
const User = models.User;
const Message = models.Message;

dotenv.config();

export default {
  // Create a group, and automatically add the creator to it
  create: (req, res) => {
    const userId = req.body.userId;
    const initialMembers = req.body.initialMembers;

    User.find({ where: { id: userId } }).then((creator) => {
      let nameOfCreator = 'Unregistered';
      // Get name of creator
      if (creator !== null) {
        nameOfCreator = `${creator.firstName} ${creator.lastName}`;
      } else {
        return res.status(404).send({ message: 'User not found' });
      }
      let newMembers = [];
      Group.build({
        createdBy: nameOfCreator,
        title: req.body.title,
        description: req.body.description,
        creatorEmail: creator.email
      }).save().then((createdGroup) => {
        newMembers.push(creator.email);
        // Add new members if specified
        if (initialMembers !== undefined && initialMembers !== null) {
          if (typeof (initialMembers) === 'string') {
            newMembers.push(initialMembers);
          }
          if (initialMembers.constructor === Array) {
            newMembers = newMembers.concat(initialMembers);
          }
        }
        User.findAll({ where: { email: newMembers } }).then((retrievedMembers) => {
          createdGroup.addUsers(retrievedMembers).then(() => res.send(createdGroup));
        });
      }).catch(err => res.status(400).send({ error: err, message: 'Group not created' }));
    }).catch(() => res.status(403).send({ message: 'Supply a valid user id' }));
  },
  // Add a user to a group
  adduser: (req, res) => {
    const groupId = req.params.id;
    const newUserEmail = req.body.email;
    const adderId = req.body.adderId;
    Group.find({ where: { id: groupId } }).then((foundGroup) => {
      foundGroup.getUsers({ where: { id: adderId } }).then((foundUsers) => {
        // Check to see if the adder belongs to the group
        if (foundUsers.length === 0) {
          return res.status(403).send({ message: 'Adder is not member of the group' });
        }
        User.find({ where: { email: newUserEmail } }).then((foundUser) => {
          if (foundUser !== null) {
            foundGroup.addUser(foundUser).then(() => res.send(foundUser));
          } else {
            return res.status(404).send({ message: 'User not found' });
          }
        });
      });
    }).catch(() => {
      return res.status(404).send({ message: 'Group not found' });
    });
  },
  // Post a message to a group
  postmessage: (req, res) => {
    const groupId = req.params.id;
    let isCommentString = req.body.isComment;
    if (isCommentString !== null && isCommentString !== undefined) {
      isCommentString = isCommentString.toLowerCase();
    }
    const isComment = isCommentString === 'true';
    const messageBody = req.body.message;
    const senderId = req.body.senderId;
    Group.find({ where: { id: groupId } }).then((foundGroup) => {
      foundGroup.getUsers({ where: { id: senderId } }).then((users) => {
        if (users.length === 0) {
          return res.status(404).send({ message: 'User does not belong to this group' });
        }
        Message.build({
          isComment,
          sentBy: `${users[0].firstName} ${users[0].lastName}`,
          body: messageBody,
          groupId
        }).save().then((createdMessage) => {
          foundGroup.addMessage(createdMessage).then(() => res.status(200).send(createdMessage));
        }).catch(() => res.status(400).send({ message: 'Incomplete fields' }));
      }).catch(() => res.status(400).send({ message: 'Invalid User Id' }));
    }).catch((err) => {
      // Check if it's a sequelize error or group doesn't exist
      if (err.constructor === TypeError) {
        return res.status(404).send({ message: 'Group not found' });
      }
      return res.status(400).send({ message: 'Invalid Group Id' });
    });
  },
  // Load messages from a particular group
  getmessages: (req, res) => {
    const groupId = req.params.id;
    Group.find({ where: { id: groupId } }).then((foundGroup) => {
      foundGroup.getMessages({ attributes: ['sentBy', 'body', 'createdAt', 'isComment'] }).then((groupMessages) => {
        return res.send(groupMessages);
      });
    }).catch((err) => {
      // Check if it's a sequelize error or group doesn't exist
      if (err.constructor === TypeError) {
        return res.status(404).send({ message: 'Group not found' });
      }
      return res.status(400).send({ message: 'Invalid Group Id' });
    });
  },
  // Get the list of members in a particular group
  getmembers: (req, res) => {
    const groupId = req.params.id;
    Group.find({ where: { id: groupId } })
      .then((foundGroup) => {
        foundGroup.getUsers({ attributes: ['firstName', 'lastName', 'email'] }).then((groupMembers) => {
          return res.status(200).send(groupMembers);
        });
      }).catch((err) => {
        // Check if it's a sequelize error or group doesn't exist
        if (err.constructor === TypeError) {
          return res.status(404).send({ message: 'Group not found' });
        }
        return res.status(400).send({ message: 'Invalid Group Id' });
      });
  }
};
