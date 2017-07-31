import models from '../models';

const User = models.User;
const Group = models.Group;

export default {
  // Load everyone registered on PostIt
  getallusers: (req, res) => {
    const offset = req.params.offset;
    const limit = req.params.limit;

    User.findAndCountAll({ attributes: ['id', 'firstName', 'lastName', 'email', 'phone'], order: [['firstName', 'ASC']], offset, limit })
      .then((allUsers) => {
        res.status(200).send(allUsers);
      }).catch(() =>
        res.status(401).send({ success: false, message: 'Invalid query in url' }));
  },
  // Load all groups created
  getAllGroups: (req, res) => {
    const offset = req.params.offset;
    const limit = req.params.limit;

    Group.findAndCountAll({ attributes: ['id', 'title', 'description', 'creatorEmail', 'createdBy', 'createdAt'], offset, limit })
      .then((allGroups) => {
        res.status(200).send(allGroups);
      }).catch(() =>
        res.status(401).send({ success: false, message: 'Invalid query in url' }));
  }
};
