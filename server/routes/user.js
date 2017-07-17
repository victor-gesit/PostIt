import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import models from '../models';
import '../auth/passport';
import tokenValidator from '../auth/tokenValidator';

dotenv.config();
const User = models.User;
const jwtSecret = process.env.JWT_SECRET;
// Load passport configuration

const router = express.Router();
router.use(passport.initialize());
router.use(passport.session());

// Authentication Routes
router.post('/signin',
  passport.authenticate('local.signin', { failWithError: true }),
  (req, res) => {
    // Successful signin
    // if user is found and password is right
    // create a token
    const user = {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      phone: req.user.phone,
    };
    const token = jwt.sign(user, jwtSecret, {
      expiresIn: '2 days' // expires in 48 hours
    });
    res.send({ user, token, message: 'Successful Signin' });
  }, (err, req, res, next) =>
    // Failure during signin
    res.send({ error: err, message: 'Error During Signin' })
);

router.post('/signup',
  passport.authenticate('local.signup', { failWithError: true }),
  (req, res, next) => {
    // Successful signup
    // if user is found and password is right
    // create a token
    const user = {
      id: req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      phone: req.user.phone,
    };
    const token = jwt.sign(user, jwtSecret, {
      expiresIn: '2 days' // expires in 48 hours
    });
    console.log('TOKEN IS HERE NEXT +++++++++++++++++++++++++++++++++++++++++++++++++++++');
    console.log(token);
    return res.send({ user, token, message: 'Successfull Signup' });
  }, (err, req, res, next) => {
    // Failure during signup
    console.log('FAILED HERE 6666666666666666666666666666666666666666666666666666666666666666');
    console.log(err);
    res.send({ error: err, message: 'Error During Signup' });
  }
);

// Validate token before accessing this route
router.use(tokenValidator.validateToken);

// Loading all groups a user belongs to
router.get('/:userId/groups', (req, res) => {
  const userId = req.params.userId;
  User.find({ where: { id: userId } }).then((foundUser) => {
    foundUser.getGroups()
      .then((groupsBelongedTo) => {
        res.send(groupsBelongedTo);
      });
  }).catch((err) => {
    // Check if it's a sequelize error or group doesn't exist
    if (err.constructor === TypeError) {
      return res.status(404).send({ message: 'User not found', error: err });
    }
    return res.status(400).send({ message: 'Invalid User Id', error: err });
  });
});

export default router;
