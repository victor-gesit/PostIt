import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt-nodejs';
import dotenv from 'dotenv';
import models from '../models';

const User = models.User;

dotenv.config();

const LocalStrategy = passportLocal.Strategy;
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.find({ where: { id } }, (err, user) => {
    done(err, user);
  });
});

passport.use('local.signup', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  (req, email, password, done) => {
    User.find({ where: {
      email
    } }).then((user) => {
      if (user) {
        return done(null, false, { message: 'Username already in use' });
      }
      const newUser = User.build({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      });
      newUser.password = req.body.password;
      newUser.save().then((savedUser) => {
        done(null, savedUser);
      });
    });
  }
));


passport.use('local.signin', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  (req, email, password, done) => {
    User.find({ where: { email } }).then((user) => {
      if (!user) {
        return done(null, false, { message: 'Email not found' });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return done(null, false, { message: 'Invalid password' });
      }
      return done(null, user);
    });
  })
);
