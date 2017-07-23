import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import group from './routes/group';
import user from './routes/user';
import general from './routes/general';
import models from './models';

dotenv.config();
const app = express();
// Middlewares

// Cross Origin Resource Sharing
app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Authentication/User routes
app.use('/api/user', user);

// Group routes
app.use('/api/group', group);

// General API Requests
app.use('/api', general);
// Give sensible response for random routes
app.use('/*', (req, res) => {
  res.status(200).send({ message: 'Api up and running. Check documentation for appropriate routes' });
});
const port = process.env.PORT || 8002;

models.sequelize.sync();
const server = app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});

// Export server for use in unit tests
export default server;
