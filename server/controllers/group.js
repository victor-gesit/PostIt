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
      // Get name of creator
      const nameOfCreator = `${creator.firstName} ${creator.lastName}`;
      let newMembers = [];
      Group.build({
        createdBy: nameOfCreator,
        title: req.body.title,
        description: req.body.description,
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
      }).catch(() => res.send({ error: 'Incomplete Fields' }));
    });
  },
  // Add a user to a group
  adduser: (req, res) => {
    const groupId = req.params.id;
    const newUserEmail = req.body.email;
    Group.find({ where: { id: groupId } }).then((foundGroup) => {
      User.find({ where: { email: newUserEmail } }).then((foundUser) => {
        foundGroup.addUser(foundUser).then(() => {
          res.send(foundUser);
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
        foundGroup.addMessage(createdMessage).then(() => {
          res.send(createdMessage);
        });
      }).catch(() => {
        res.send({ error: 'Group not found' });
      });
    }).catch(() => {
      res.send({ error: 'Group not found' });
    });
  },
  // Load messages from a particular group
  getmessages: (req, res) => {
    const groupId = req.params.id;
    Group.find({ where: { id: groupId } }).then((foundGroup) => {
      foundGroup.getMessages({ attributes: ['sentBy', 'body', 'createdAt'] }).then((groupMessages) => {
        res.send(groupMessages);
      });
    }).catch(() => {
      res.send({ error: 'Group not found' });
    });
  },
  // Get the list of members in a particular group
  getmembers: (req, res) => {
    const groupId = req.params.id;
    Group.find({ where: { id: groupId } })
      .then((foundGroup) => {
        foundGroup.getUsers({ attributes: ['firstName', 'lastName', 'email'] }).then((groupMembers) => {
          res.send(groupMembers);
        });
      }).catch(() => {
        res.send({ error: 'Group not found' });
      });
  },
  // Load all the groups that a user belongs to, for the message board
  messageboard: (req, res) => {
    const userId = req.params.userId;
    User.find({ where: { id: userId } }).then((foundUser) => {
      foundUser.getGroups()
        .then((groupsBelongedTo) => {
          res.send(groupsBelongedTo);
        });
    }).catch(() => {
      res.send({ error: 'User not found' });
    });
  },
  // Load everyone registered on PostIt
  getallusers: (rq, res) => {
    User.findAll({ attributes: ['firstName', 'lastName', 'email'] }).then((allUsers) => {
      res.send(allUsers);
    });
  }
};
