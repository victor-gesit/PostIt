import passport from 'passport';
import passportLocal from 'passport-local';
import Sequelize from 'sequelize';
import bcrypt from 'bcrypt-nodejs';
import dotenv from 'dotenv';

dotenv.config();
const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME,
  process.env.DB_PASSWORD, {
    dialect: 'postgres'
  });

const User = connection.define('user', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  groupsOwned: Sequelize.ARRAY(Sequelize.STRING)
});

User.beforeCreate((user) => {
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(5), null);
});


connection.sync();

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
