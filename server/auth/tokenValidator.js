import jwt from 'jsonwebtoken';
import {} from 'dotenv/config';

const jwtSecret = process.env.JWT_SECRET;
export default {
  validateToken: (req, res, next) => {
    const token = req.body.token
      || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
          return res.status(401).send({
            message: 'Could not authenticate token', error: err });
        }
        req.decoded = decoded;
        next();
      });
    } else {
      return res.status(401).send({
        message: 'No token provided', success: false });
    }
  }
};
