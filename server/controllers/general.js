import models from '../models';

const User = models.User;
const Group = models.Group;

export default {
  // Load everyone registered on PostIt
  getallusers: (req, res) => {
    User.findAll({ attributes: ['id', 'firstName', 'lastName', 'email'] }).then((allUsers) => {
      res.status(200).send(allUsers);
    });
  },
  getAllGroups: (req, res) => {
    Group.findAll({ attributes: ['id', 'title', 'description', 'creatorEmail', 'createdBy', 'createdAt'] }).then((allGroups) => {
      res.status(200).send(allGroups);
    });
  }
};
