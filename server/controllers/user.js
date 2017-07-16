import dotenv from 'dotenv';
import models from '../models';

const User = models.User;
dotenv.config();

export default {
  // Load all the groups that a user belongs to, for the message board
  messageboard: (req, res) => {
    const userId = req.body.userId;
    User.find({ where: { id: userId } }).then((foundUser) => {
      foundUser.getGroups()
        .then((groupsBelongedTo) => {
          res.send(groupsBelongedTo);
        });
    }).catch((err) => {
      res.send({ message: 'User not found', error: err });
    });
  }
};
