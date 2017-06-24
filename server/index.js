import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import passport from 'passport';
import group from './routes/group';
import models from './models';

// Get the content of the ./auth/passport file
import './auth/passport';

const app = express();
// Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  res.status(200).send({ message: 'Api up and running' });
});

// User routes
app.post('/api/user/signin', passport.authenticate('local.signin'), (req, res) => {
  res.send({ message: 'Signed in successfully' });
});
app.post('/api/user/signup', passport.authenticate('local.signup'), (req, res) => {
  res.send({ message: 'Signed up successfully' });
});
// Create a group
app.post('/api/group', group.create);
// Add a user to the group
app.post('/api/group/:id/user', group.adduser);
// Post a message to the group
app.post('/api/group/:id/message', group.postmessage);
// Get messasges belonging to a particular group
app.get('/api/group/:id/messages', group.getmessages);
// Get all members of a particular group
app.get('/api/group/:id/members', group.getmembers);

const port = process.env.PORT || 8000;
let server = {};
models.sequelize.sync().then(() => {
  server = app.listen(port, () => {
    console.log(`Listening at port ${port}`);
  });
});


// Export server for use in unit tests
// export default server;
