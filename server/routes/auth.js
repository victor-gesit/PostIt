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
function authError(err, req, res, next) {
  const statusCode = err.status || 500;
  return res.status(statusCode).json({ error: 'Server error' });
}
router.use([authError]);

router.post('/signin',
  passport.authenticate('local.signin', { failWithError: true }),
  (req, res, next) => {
    // Successful signin
    return res.json({ id: req.user.id, message: 'Successful Signin' });
  }, (err, req, res, next) => {
    // Failure during signin
    return res.json({ error: err, message: 'Error during signin' });
  }
);

router.post('/signup',
  passport.authenticate('local.signup', { failWithError: true }),
  (req, res, next) => {
    // Successful signup
    return res.json( { id: req.user.id, message: 'Successfull Signup' });
  }, (err, req, res, next) => {
    // Failure during signup
    return res.json({ error: err, message: 'Error in signup' });
  }
);

export default router;