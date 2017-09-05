
import io from 'socket.io';
import models from './models';

const User = models.User;
const Message = models.Message;
const Group = models.Group;

export default (server, app) => {
  const socketServer = io(server);
  const connections = {};
  const unreadMessages = {};
  socketServer.on('connection', (client) => {
    console.log('a user connected');
    client.on('disconnect', () => {
      console.log('user disconnected');
    });
    client.on('open group', (data) => {
      const groupId = data.groupId;
      const userId = data.userId;
      // Indicate that member has read all messages in the group
      unreadMessages[groupId] = unreadMessages[groupId] || {};
      unreadMessages[groupId][userId] = unreadMessages[groupId][userId] || 0;
      console.log('UNREAD MESSAGES', unreadMessages[groupId][userId]);
      connections[groupId] = connections[groupId] || [];
      connections[groupId].push(userId);
      Message.findAndCountAll({ where: { groupId }, attributes: ['id'] }).then((groupMessages) => {
        for (let i = 0; i < unreadMessages[groupId][userId]; i += 1) {
          console.log('GOTTEN HERE');
          User.findAll({ where: { id: [userId] } }).then((foundUser) => {
            console.log(foundUser);
            groupMessages.rows[i].addUser(foundUser)
            .catch((err) => {
              console.log(err);
            });
          });
        }
        unreadMessages[groupId][userId] = 0;
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
    client.on('postMessage', (data) => {
      const groupMembers = data.groupMembers;
      const groupId = data.groupId;
      const senderId = data.senderId;
      const groupMemberIds = Object.keys(groupMembers).map(groupMember => groupMember);
      groupMemberIds.forEach((groupMember) => {
        if (groupMember !== senderId) {
          unreadMessages[groupId] = unreadMessages[groupId] || {};
          unreadMessages[groupId][groupMember] = unreadMessages[groupId][groupMember] || 0;
          unreadMessages[groupId][groupMember] += 1;
        }
      });
      app.connections = connections;
      app.client = client;
    });
  });
};
