import express from 'express';
import passport from 'passport';
import models from '../models';
import '../auth/passport';

const User = models.User;

// Load passport configuration

const router = express.Router();
router.use(passport.initialize());
router.use(passport.session());

// Authentication Routes
router.post('/signin',
  passport.authenticate('local.signin', { failWithError: true }),
  (req, res, next) =>
    // Successful signin
    res.send({ user: req.user, message: 'Successful Signin' }), (err, req, res, next) =>
    // Failure during signin
    res.send({ error: err, message: 'Error During Signin' })
);

router.post('/signup',
  passport.authenticate('local.signup', { failWithError: true }),
  (req, res, next) =>
    // Successful signup
    res.send({ user: req.user, message: 'Successfull Signup' }), (err, req, res, next) =>
    // Failure during signup
    res.send({ error: err, message: 'Error During Signup' })
);

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
