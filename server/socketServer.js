
import io from 'socket.io';
 
export default (server, app) => {
  const socketServer = io(server);
  socketServer.on('connection', (client) => {
    console.log('a user connected');
    client.on('disconnect', () => {
      console.log('user disconnected');
    });

    client.on('open group', (data) => {
      const groupId = data.groupId;
      client.join(groupId, () => {
        console.log(client.id, ' now in rooms ', client.rooms);
      });
    });

    client.on('close group', (data) => {
      const groupId = data.groupId;
      client.leave(groupId);
    });
    client.on('postMessage', () => {
      app.client = client;
    });
  });
};
