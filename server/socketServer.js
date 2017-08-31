
import io from 'socket.io';
import models from './models';

const User = models.User;
const Message = models.Message;
const Group = models.Group;

export default (server, app) => {
  const socketServer = io(server);
  const connections = {};
  socketServer.on('connection', (client) => {
    console.log('a user connected');
    client.on('disconnect', () => {
      console.log('user disconnected');
    });
    client.on('open group', (data) => {
      const groupId = data.groupId;
      const userId = data.userId;
      connections[groupId] = connections[groupId] || [];
      connections[groupId].push(userId);
      Message.findAndCountAll({ where: { groupId }, attributes: ['id'] }).then((groupMessages) => {
        for (let i = groupMessages.rows.length - 5; i < groupMessages.rows.length; i += 1) {
          if (i < 0) {
            break;
          }
          User.find({ where: { id: userId } }).then((foundUser) => {
            groupMessages.rows[i].addUser(foundUser)
            .catch((err) => {
              console.log(err);
            });
          });
        }
      });
      client.join(groupId, () => {
        console.log(client.id, ' now in rooms ', client.rooms);
      });
    });
    client.on('delete member', (data) => {
      const userId = data.userId;
      const groupId = data.groupId;
      connections[groupId] = connections[groupId] || [];
      const index = connections[groupId].indexOf(userId);
      connections[groupId].splice(index, 1);
    });
    client.on('close group', (data) => {
      const userId = data.userId;
      const groupId = data.groupId;
      connections[groupId] = connections[groupId] || [];
      const index = connections[groupId].indexOf(userId);
      connections[groupId].splice(index, 1);
      client.leave(groupId);
    });
    client.on('delete group', (data) => {

    });
    client.on('postMessage', () => {
      app.connections = connections;
      app.client = client;
    });
  });
};
