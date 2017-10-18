import jwt from 'jsonwebtoken';
import sendEmail from './utils/sendEmail';
import models from '../models';
import generatePagination from './utils/generatePagination';

const Group = models.Group;
const User = models.User;
const Message = models.Message;

export default {
  // Create a group, and automatically add the creator to it
  create: (req, res) => {
    const token = req.body.token ||
      req.query.token || req.headers['x-access-token'];
    const decode = jwt.decode(token);
    const userId = decode.id;
    // const userId = req.body.creatorId;
    const initialMembers = req.body.initialMembers || [];
    // Validate input
    let title = req.body.title || '';
    let description = req.body.description || '';
    title = title.trim();
    description = description.trim();

    User.find({ where: { id: userId } }).then((creator) => {
      let nameOfCreator = 'Unregistered';
      // Get name of creator
      if (creator !== null) {
        nameOfCreator = `${creator.firstName} ${creator.lastName}`;
      } else {
        return res.status(404).send({ success: false,
          message: 'User not found' });
      }
      let newMembers = [];
      Group.build({
        title,
        description,
        createdBy: nameOfCreator,
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
        User.findAll({ where: { email: newMembers } })
        .then((retrievedMembers) => {
          createdGroup.addUsers(retrievedMembers)
            .then(() => res.status(202).send({ success: true,
              type: 'Group',
              createdGroup }));
        });
      }).catch((err) => {
        const errorMessages = err.errors.map(error => error.message);
        return res.status(400).send({
          success: false,
          messages: errorMessages,
          message: 'Incomplete fields'
        });
      });
    }).catch(() => res.status(422).send({ success: false,
      message: 'Supply a valid user id' }));
  },
  // Add a user to a group
  addUser: (req, res) => {
    const groupId = req.params.id;
    const newUserEmail = req.body.email;
    const token = req.body.token ||
    req.query.token || req.headers['x-access-token'];
    const decode = jwt.decode(token);
    const adderId = decode.id;
    // const adderId = req.body.adderId;

    let newMembers = [];
    // Add new members if specified
    if (newUserEmail !== undefined && newUserEmail !== null) {
      if (typeof (newUserEmail) === 'string') {
        newMembers.push(newUserEmail);
      }
      if (newUserEmail.constructor === Array) {
        newMembers = newMembers.concat(newUserEmail);
      }
    }
    Group.find({ where: { id: groupId } }).then((foundGroup) => {
      foundGroup.getUsers({ where: { id: adderId } }).then((foundUsers) => {
        // Check to see if the adder belongs to the group
        if (foundUsers.length === 0) {
          return res.status(403).send({ success: false,
            message: 'Adder is not member of the group' });
        }
        // Find the new users and add them to the group
        User.findAll({ where: { email: newMembers },
          attributes: ['firstName', 'lastName', 'id', 'email', 'phone'] })
          .then((foundMembers) => {
            if (foundMembers !== null && foundMembers.length !== 0) {
              foundGroup.addUser(foundMembers)
                .then(() => res.status(200).send({
                  success: true,
                  addedMembers: foundMembers
                }));
            } else {
              return res.status(404).send({ success: false,
                message: 'User not found' });
            }
          });
      });
    }).catch(() => res.status(404).send({ success: false,
      message: 'Group not found' }));
  },
  // Post a message to a group
  postMessage: (req, res) => {
    const groupId = req.params.id;
    let priority = req.body.priority || 'normal';
    let messageBody = req.body.body || '';
    let isCommentString = req.body.isComment;
    const client = req.app.client;
    if (isCommentString !== null && isCommentString !== undefined) {
      isCommentString = isCommentString.toLowerCase();
    }
    if (priority !== null && priority !== undefined) {
      priority = priority.toLowerCase();
    }
    const isComment = isCommentString === 'true';
    if (isComment) {
      priority = 'normal';
    }
    messageBody = messageBody.trim();
    const token = req.body.token ||
      req.query.token || req.headers['x-access-token'];
    const decode = jwt.decode(token);
    const senderId = decode.id;
    Group.find({ where: { id: groupId } }).then((foundGroup) => {
      foundGroup.getUsers({ where: { id: senderId } }).then((users) => {
        if (users.length === 0) {
          return res.status(403).send({ success: false,
            message: 'User does not belong to this group' });
        }
        Message.build({
          groupId,
          priority,
          senderId,
          isComment,
          sentBy: `${users[0].firstName} ${users[0].lastName}`,
          body: messageBody
        }).save().then((createdMessage) => {
          const connections = req.app.connections || {};
          const connectedUsers = connections[groupId] || [];
          User.findAll({ where: { id: connectedUsers } })
          .then((foundUsers) => {
            createdMessage.addUser(foundUsers);
          })
          .catch();
          foundGroup.addMessage(createdMessage).then(() => {
            if (priority !== 'normal') {
              foundGroup.getUsers({ attributes: ['email', 'phone'] })
              .then((groupMembers) => {
                if (priority === 'critical') {
                  sendEmail(foundGroup, groupMembers, createdMessage);
                } else {
                  sendEmail(foundGroup, groupMembers, createdMessage);
                }
              });
            }
            if (client) {
              client.broadcast.to(groupId).emit('notify', createdMessage);
            }
            res.status(200).send({ success: true, message: createdMessage });
          });
        }).catch(err => res.status(400).send({ err,
          success: false,
          message: 'Incomplete fields. Specify body and priority (normal, urgent or critical)' }));
      }).catch(() => res.status(422).send({ success: false,
        message: 'Invalid User Id' }));
    }).catch((err) => {
      // Check if it's a sequelize error or group doesn't exist
      if (err.constructor === TypeError) {
        return res.status(404).send({ success: false,
          message: 'Group not found' });
      }
      return res.status(422).send({ success: false,
        message: 'Invalid Group Id' });
    });
  },
  // See the list of those who have seen a message
  seenBy: (req, res) => {
    const messageId = req.params.id;
    Message.find({ where: { id: messageId } })
    .then((foundMessage) => {
      if (!foundMessage) {
        return res.status(404).send({ success: false,
          message: 'Message not found' });
      }
      foundMessage.getUsers({ attributes: ['firstName', 'lastName', 'email'] })
        .then(foundUsers =>
          res.status(202).send({ success: true, seenBy: foundUsers })
        );
    })
    .catch((err) => {
      // Check if it's a sequelize error or group doesn't exist
      if (err.constructor === TypeError) {
        return res.status(404).send({ success: false,
          message: 'Message not found' });
      }
      return res.status(422).send({ success: false,
        message: 'Invalid Message Id' });
    });
  },
  // Load messages from a particular group
  getMessages: (req, res) => {
    const groupId = req.params.id;
    const offset = req.query.offset;
    const limit = req.query.limit;
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const decode = jwt.decode(token);
    const userId = decode.id;
    Group.find({ where: { id: groupId } }).then((foundGroup) => {
      if (foundGroup === null) {
        return res.status(404).send({ success: false, message: 'Group not found' });
      }
      // Verify that user belongs to this group
      foundGroup.getUsers({ where: { id: userId } }).then((foundUsers) => {
        if (foundUsers.length === 0) {
          return res.status(403).send({ success: false,
            message: 'User does not belong to this group' });
        }
        Message.findAndCountAll({
          offset,
          limit,
          where: { groupId },
          attributes: ['sentBy', 'id', 'senderId', 'body', 'createdAt', 'priority', 'isComment'],
          order: [['createdAt', 'ASC']]
        }).then(result =>
          res.status(200).send(result)
        ).catch(() =>
          res.status(422).send({ success: false, message: 'Invalid query in url' }));
      });
    }).catch(() => res.status(422).send({ success: false, message: 'Invalid Group Id' }));
  },
  // Get the list of members in a particular group
  getMembers: (req, res) => {
    const groupId = req.params.id;
    const offset = req.query.offset;
    const limit = req.query.limit;
    // Extract userId from token
    const token = req.body.token ||
      req.query.token || req.headers['x-access-token'];
    const decode = jwt.decode(token);
    const userId = decode.id;
    let count;
    Group.find({ where: { id: groupId } })
      .then((foundGroup) => {
        // Verify that user belongs to this group
        foundGroup.getUsers({ where: { id: userId } })
        .then((foundUsers) => {
          if (foundUsers.length === 0) {
            return res.status(403).send({ success: false,
              message: 'User does not belong to this group' });
          }
          foundGroup.getUsers().then((allMembers) => {
            count = allMembers.length;
            foundGroup.getUsers({ attributes:
              ['firstName', 'lastName', 'email', 'id', 'phone'],
              order: [['firstName', 'ASC']],
              limit,
              offset })
              .then((groupMembers) => {
                const countOfMembers = groupMembers.length;
                const allLoaded = Number(offset) + countOfMembers;
                generatePagination(offset, limit, count, allLoaded, (meta) => {
                  return res.status(200).send({
                    success: true,
                    type: 'Users',
                    rows: groupMembers,
                    count,
                    allLoaded,
                    meta
                  });
                });
              })
              .catch(() =>
                res.status(422).send({ success: false,
                  message: 'Invalid query in url' }));
          });
        });
      }).catch((err) => {
        // Check if it's a sequelize error or group doesn't exist
        if (err.constructor === TypeError) {
          return res.status(404).send({ success: false,
            message: 'Group not found' });
        }
        return res.status(422).send({ success: false,
          message: 'Invalid Group Id' });
      });
  },
  // Delete a person from the group
  deleteMembers: (req, res) => {
    const groupId = req.params.id;
    const toBeDeleted = req.body.idToDelete;
    // Extract userId from token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const decode = jwt.decode(token);
    const ownerId = decode.id;
    let membersToDelete = [];
    if (toBeDeleted !== undefined && toBeDeleted !== null) {
      if (typeof (toBeDeleted) === 'string') {
        membersToDelete.push(toBeDeleted);
      }
      if (toBeDeleted.constructor === Array) {
        membersToDelete = membersToDelete.concat(toBeDeleted);
      }
    }
    Group.find({ where: { id: groupId } }).then((foundGroup) => {
      foundGroup.getUsers({ where: { id: ownerId } }).then((foundUsers) => {
        // Check to see if the the person deleting belongs to the group
        if (foundUsers.length === 0) {
          return res.status(403).send({ success: false,
            message: 'You are not a member of this group' });
        }
        // Is the person the creator?
        if (foundGroup.creatorEmail !== foundUsers[0].email) {
          return res.status(403).send({ success: false,
            message: 'You are not the creator of this group. You cannot delete members' });
        }
        foundGroup.getUsers({ where: { id: toBeDeleted } })
        .then((inGroupAndToBeDeleted) => {
          if (inGroupAndToBeDeleted.length === 0) {
            return res.status(404).send({ success: false,
              message: 'The person(s) to be deleted do not belong to the group' });
          }
          // You cannot delete the group creator
          if (foundGroup.creatorEmail === inGroupAndToBeDeleted[0].email) {
            return res.status(403).send({ success: false,
              message: 'You cannot delete the group creator. Delete the group instead, if you created it.' });
          }
          foundGroup.removeUsers(inGroupAndToBeDeleted).then(() =>
            res.status(200).send({ success: true,
              message: 'Deleted successfully' }));
        }).catch((err) => {
          // Check if it's a sequelize error or user id doesn't exist
          if (err.constructor === TypeError) {
            return res.status(404).send({ success: false,
              message: 'User not found' });
          }
          return res.status(422).send({ success: false,
            message: 'Invalid User Id' });
        });
      });
    }).catch((err) => {
      // Check if it's a sequelize error or group doesn't exist
      if (err.constructor === TypeError) {
        return res.status(404).send({ success: false, message: 'Group not found' });
      }
      return res.status(422).send({ success: false, message: 'Invalid Group Id' });
    });
  },
  // Deleting a group
  deleteGroup: (req, res) => {
    const groupId = req.params.id;
    // Extract userId from token
    const token = req.body.token ||
      req.query.token || req.headers['x-access-token'];
    const decode = jwt.decode(token);
    const ownerId = decode.id;
    Group.find({ where: { id: groupId } }).then((foundGroup) => {
      foundGroup.getUsers({ where: { id: ownerId } }).then((foundUsers) => {
        // Check to see if the group remover owns the group
        if (foundUsers.length === 0) {
          return res.status(403).send({ success: false,
            message: 'You cannot remove a group you are not a member of' });
        }
        if (foundGroup.creatorEmail !== foundUsers[0].email) {
          return res.status(403).send({ success: false,
            message: 'You are not the creator of this group' });
        }
        foundGroup.destroy().then(() =>
          res.status(200).send({ success: true,
            message: 'Group deleted successfully' }));
      });
    }).catch(() => res.status(404).send({ success: false,
      message: 'Group not found' }));
  },
  // Leaving a group
  leaveGroup: (req, res) => {
    const groupId = req.params.id;
    const token = req.body.token ||
      req.query.token || req.headers['x-access-token'];
    const decode = jwt.decode(token);
    const userId = decode.id;
    Group.find({ where: { id: groupId } }).then((foundGroup) => {
      foundGroup.getUsers({ where: { id: userId } }).then((foundUsers) => {
        // Check to see if person to be deleted belongs to the group
        if (foundUsers.length === 0) {
          return res.status(403).send({ success: false,
            message: 'You are not a member of this group' });
        }
        // You cannot leave if you are the group creator
        if (foundGroup.creatorEmail === foundUsers[0].email) {
          return res.status(403).send({ success: false,
            message: 'You cannot leave a group you created. Delete group instead' });
        }
        foundGroup.removeUsers(foundUsers).then(() =>
          res.status(200).send({ success: true,
            message: 'Left group successfully' }));
      }).catch((err) => {
        // Check if it's a sequelize error or user id doesn't exist
        if (err.constructor === TypeError) {
          return res.status(404).send({ success: false,
            message: 'User not found' });
        }
        return res.status(422).send({ success: false,
          message: 'Invalid User Id' });
      });
    }).catch((err) => {
      // Check if it's a sequelize error or group doesn't exist
      if (err.constructor === TypeError) {
        return res.status(404).send({ success: false,
          message: 'Group not found' });
      }
      return res.status(422).send({ success: false,
        message: 'Invalid Group Id' });
    });
  },
  searchGroup: (req, res) => {
    const groupId = req.params.id;
    const offset = req.query.offset;
    const limit = req.query.limit;
    let searchQuery = req.query.searchQuery;
    let query = {};
    if (searchQuery) {
      searchQuery = searchQuery.trim().split(/ +/);
      searchQuery = searchQuery.map(word => `%${word}%`);
      query = {
        $or: {
          firstName: {
            $iLike: {
              $any: searchQuery
            }
          },
          lastName: {
            $iLike: {
              $any: searchQuery
            }
          }
        }
      };
    }
    // Extract userId from token
    const token = req.body.token ||
      req.query.token || req.headers['x-access-token'];
    const decode = jwt.decode(token);
    const userId = decode.id;
    Group.find({ where: { id: groupId } })
      .then((foundGroup) => {
        // Verify that user belongs to this group
        foundGroup.getUsers({ where: { id: userId } })
        .then((foundUsers) => {
          if (foundUsers.length === 0) {
            return res.status(403).send({ success: false,
              message: 'User does not belong to this group' });
          }
          foundGroup.getUsers({ where: query }).then((allMembers) => {
            const count = allMembers.length;
            foundGroup.getUsers({
              offset,
              limit,
              where: query,
              attributes: ['firstName', 'lastName', 'email', 'id', 'phone'],
              order: [['firstName', 'ASC']]
            })
              .then((groupMembers) => {
                const totalLoaded = groupMembers.length + Number(offset);
                return res.status(200)
                  .send({ searchQuery,
                    count,
                    totalLoaded,
                    success: true,
                    type: 'Users',
                    rows: groupMembers });
              })
              .catch(() =>
                res.status(422).send({ success: false,
                  message: 'Invalid query in url' }));
          });
        });
      }).catch((err) => {
        // Check if it's a sequelize error or group doesn't exist
        if (err.constructor === TypeError) {
          return res.status(404).send({ success: false,
            message: 'Group not found' });
        }
        return res.status(422).send({ success: false,
          message: 'Invalid Group Id' });
      });
  }
};
