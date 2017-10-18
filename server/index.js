import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import http from 'http';
import group from './routes/group';
import user from './routes/user';
import general from './routes/general';
import models from './models';
import socketServer from './socketServer';

dotenv.config();
const app = express();

// Link app to socket io
const httpServer = http.createServer(app);
socketServer(httpServer, app);

// Middlewares
// Cross Origin Resource Sharing
app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const indexPath = path.join(__dirname, '../client/index.html');
const publicPath = express.static(path.join(__dirname, '../client'));

app.use(publicPath);

// Load landing page
app.get('/', (req, res) => { res.sendFile(indexPath); });

// Authentication/User routes
app.use('/api/user', user);

// Group routes
app.use('/api/group', group);

// General API Requests
app.use('/api', general);
// Give sensible response for random routes
app.use('/*', (req, res) => {
  res.status(404).send({ message: 'Api up and running. Check documentation for appropriate routes' });
});
const port = process.env.PORT || 8002;

models.sequelize.sync();
const server = httpServer.listen(port);

// Export server for use in unit tests
export default server;
