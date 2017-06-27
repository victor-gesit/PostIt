import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import group from './routes/group';
import models from './models';
import auth from './routes/auth';

// Get the content of the ./auth/passport file

const app = express();
// Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  res.status(200).send({ message: 'Api up and running' });
});

// User routes
app.use('/api/user', auth);

// Group routes
app.use('/api/group', group);

const port = process.env.PORT || 8002;
const server = app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});

// Export server for use in unit tests
export default server;
