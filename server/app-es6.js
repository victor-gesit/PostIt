import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import passport from 'passport';
import group from './routes/group';
// Get the content of the ./auth/passport file
import './auth/passport';


const app = express();
// Middlewares
app.use(logger('dev'));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  res.status(200).send({ message: 'Api up and running' });
});

const port = process.env.PORT || 8000;

app.post('/api/user/signin', passport.authenticate('local.signin'), (req, res) => {
  res.send({ message: 'Signed in successfully' });
});
app.post('/api/user/signup', passport.authenticate('local.signup'), (req, res) => {
  res.send({ message: 'Signed up successfully' });
});
app.post('/api/group', group.create);
app.post('/api/group/:id/user', group.adduser);
app.post('/api/group/:id/message', group.postmessage);
app.get('/api/group/:id/messages', group.getmessages);

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
