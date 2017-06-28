import express from 'express';
import passport from 'passport';


// Load passport configuration
import '../auth/passport';

const router = express.Router();
router.use(passport.initialize());
router.use(passport.session());

// Middlware to handle server errors during authentication
/**
 * @returns null
 * @param {Object} err Error object sent from server
 * @param {*} req Request object
 * @param {*} res Response Object
 * @param {*} next Next Callback function
 */

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

export default router;
