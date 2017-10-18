import jwt from 'jsonwebtoken';
import models from '../models';
import generatePagination from './utils/generatePagination';

const User = models.User;

export default {
  // Load all the groups that a user belongs to, for the message board
  userGroups: (req, res) => {
    const token = req.body.token ||
      req.query.token || req.headers['x-access-token'];
    const decode = jwt.decode(token);
    const userId = decode.id;
    let offset = req.query.offset || 0;
    const limit = req.query.limit || 6;
    let count;
    User.find({ where: { id: userId } }).then((foundUser) => {
      foundUser.getGroups().then().then((allGroups) => {
        count = allGroups.length;
        foundUser.getGroups({ attributes:
          ['id', 'createdBy', 'title', 'description', 'creatorEmail', 'createdAt'],
          order: [['title', 'ASC']],
          limit,
          offset })
          .then((groupsBelongedTo) => {
            offset = Number(offset);
            const allLoaded = offset + groupsBelongedTo.length;
            generatePagination(offset, limit, count, allLoaded, (meta) => {
              res.status(200).send({ count,
                allLoaded,
                meta,
                success: true,
                type: 'Groups',
                rows: groupsBelongedTo
              });
            });
          }).catch(() => res.status(422).send({ success: false,
            message: 'Invalid query in url' }));
      });
    }).catch((err) => {
      // Check if it's a sequelize error or group doesn't exist
      if (err.constructor === TypeError) {
        return res.status(404).send({ success: false,
          message: 'User not found',
          error: err });
      }
      return res.status(422).send({ success: false,
        message: 'Invalid User Id' });
    });
  },
  getUserInfo: (req, res) => {
    const token = req.body.token ||
      req.query.token || req.headers['x-access-token'];
    const decode = jwt.decode(token);
    const userId = decode.id;
    User.find({ where: { id: userId }, attributes: ['firstName', 'lastName', 'email', 'phone', 'id'] }).then((foundUser) => {
      if (!foundUser) {
        return res.status(404).send({
          success: false,
          message: 'Token valid, but user not found'
        });
      }
      return res.status(200).send({ success: true,
        message: 'Token is valid. User data gotten',
        user: foundUser });
    })
      .catch((err) => {
        // Check if it's a sequelize error or group doesn't exist
        if (err.constructor === TypeError) {
          return res.status(404).send({ success: false,
            message: 'User not found' });
        }
        return res.status(422).send({ success: false,
          message: 'Invalid User Id' });
      });
  }
};
