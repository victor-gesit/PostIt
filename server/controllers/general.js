import models from '../models';

const User = models.User;


export default {
  // Load everyone registered on PostIt
  getallusers: (req, res) => {
    User.findAll({ attributes: ['id', 'firstName', 'lastName', 'email'] }).then((allUsers) => {
      res.status(200).send(allUsers);
    });
  }
};
