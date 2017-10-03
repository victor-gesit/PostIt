
import io from 'socket.io';
import models from './models';

const User = models.User;
const Message = models.Message;

export default (server, app) => {
  const socketServer = io(server);
  const connections = {};
  const unreadMessages = {};
  socketServer.on('connection', (client) => {
    client.on('disconnect', () => {
    });
    client.on('open group', (data) => {
      const groupId = data.groupId;
      const userId = data.userId;
      // Indicate that member has read all messages in the group
      unreadMessages[groupId] = unreadMessages[groupId] || {};
      unreadMessages[groupId][userId] = unreadMessages[groupId][userId] || 0;
      connections[groupId] = connections[groupId] || [];
      connections[groupId].push(userId);
      client.join(groupId, () => {
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
    client.on('delete group', () => {

    });
    client.on('postMessage', (data) => {
      const groupMembers = data.groupMembers;
      const groupId = data.groupId;
      const senderId = data.senderId;
      const groupMemberIds = Object.keys(groupMembers)
        .map(groupMember => groupMember);
      groupMemberIds.forEach((groupMember) => {
        if (groupMember !== senderId) {
          unreadMessages[groupId] = unreadMessages[groupId] || {};
          unreadMessages[groupId][groupMember] =
            unreadMessages[groupId][groupMember] || 0;
          unreadMessages[groupId][groupMember] += 1;
        }
      });
      app.connections = connections;
      app.client = client;
    });
  });
};

