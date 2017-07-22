import dotenv from 'dotenv';
import models from '../models';

const User = models.User;
dotenv.config();

export default {
  // Load all the groups that a user belongs to, for the message board
  messageboard: (req, res) => {
    const userId = req.params.userId;
    const offset = req.params.offset;
    const limit = req.params.limit;
    let count;
    User.find({ where: { id: userId } }).then((foundUser) => {
      foundUser.getGroups().then().then((allGroups) => {
        count = allGroups.length;
        foundUser.getGroups({ attributes: ['id', 'createdBy', 'title', 'description', 'createdAt'], limit, offset })
          .then((groupsBelongedTo) => {
            res.status(200).send({
              success: true,
              count,
              rows: groupsBelongedTo
            });
          }).catch(() => res.status(401).send({ success: false, message: 'Invalid query in url' }));
      });
    }).catch((err) => {
      // Check if it's a sequelize error or group doesn't exist
      if (err.constructor === TypeError) {
        return res.status(404).send({ success: false, message: 'User not found', error: err });
      }
      return res.status(400).send({ success: false, message: 'Invalid User Id', error: err });
    });
  }
};
