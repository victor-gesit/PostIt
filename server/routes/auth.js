import express from 'express';
import passport from 'passport';


// Load passport configuration
import passport from '../auth/passport';

const router = express.Router();
router.use(passport.initialize());
router.use(passport.session());

router.post('/api/user/signin', (req, res, next) => {
  passport.authenticate('local.signin', (err, user, info) => {
    if(err) {
      return next(err);
    }
    if(!user) { return res.send({ error: 'User not found' });}
    return res.send(user);
  })
});

router.post('/api/user/signup', (req, res, next) => {

});