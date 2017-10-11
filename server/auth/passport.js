import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt-nodejs';
import models from '../models';

const User = models.User;

const LocalStrategy = passportLocal.Strategy;

// Strategy for signup
passport.use('local.signup', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  (req, email, password, done) => {
    User.find({ where: {
      $or: [
        { email },
        { phone: req.body.phone }
      ]
    } }).then((user) => {
      if (user) {
        if (user.email === email) {
          return done(null, false, {
            message: 'Email is already linked to another account' });
        }
        if (user.phone === req.body.phone) {
          return done(null, false, {
            message: 'Phone number is linked to another account' });
        }
      }
      let firstName = req.body.firstName || '';
      let lastName = req.body.lastName || '';
      const phone = req.body.phone;
      firstName = firstName.trim();
      lastName = lastName.trim();
      password = password.trim();

      const newUser = User.build({
        email,
        firstName,
        lastName,
        phone
      });
      newUser.password = password;
      newUser.save().then((savedUser) => {
        done(null, savedUser);
      }).catch((err) => {
        done(err, false);
      });
    }).catch((err) => { // Server error
      done(err, false);
    });
  }
));

// Strategy for signin
passport.use('local.signin', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  (req, email, password, done) => {
    User.find({ where: { email } }).then((user) => {
      if (!user) {
        return done(null, false,
          { message: 'Email not associated with any account' });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return done(null, false, { message: 'Invalid password' });
      }
      return done(null, user);
    }).catch((err) => {
      done(err);
    });
  })
);

passport.use('google.custom', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const googleId = req.body.googleId;
    // try to find the user based on their google id
    User.find({ where: { googleId } }).then((user) => {
      if (user) {
        return done(null, user);
      } else {
        // if the user is not in database, create a new user
        const newUser = User.build({
          googleId,
          email,
          firstName,
          lastName,
        });
        newUser.password = password;
        // save the user
        newUser.save().then((savedUser) => {
          done(null, savedUser);
        }).catch((err) => {
          done(err, false);
        });
      }
    })
    .catch((err) => {
      if (err) {
        return done(err);
      }
    });
  })
);
