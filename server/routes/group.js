import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME,
  process.env.DB_PASSWORD, {
    dialect: 'postgres'
  });
const Group = connection.define('group', {
  createdBy: Sequelize.STRING,
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  members: Sequelize.ARRAY(Sequelize.STRING),
  messages: Sequelize.ARRAY(Sequelize.TEXT)
});

connection.sync();
export default {
  // Create a group
  create: (req, res) => {
    const newGroup = Group.build({
      createdBy: 'victor4l@yahoo.com',
      title: req.body.title,
      description: req.body.description,
      members: ['victor@yahoo.com', 'ada@google.com', 'nkechi@gmail.com'],
      messages: []
    });
    newGroup.save().then((createdGroup) => {
      res.send(createdGroup);
    });
  },
  // Add a user to a group
  adduser: (req, res) => {
    const groupId = req.params.id;
    const newUserEmail = req.body.email;
    Group.find({ where: { id: groupId } }).then((foundGroup) => {
      foundGroup.members.push(newUserEmail);
      foundGroup.update({
        members: foundGroup.members
      }, {
        where: {
          id: groupId
        }
      }).then(updatedGroup => res.send(updatedGroup));
    });
  },
  // Post a message to a group
  postmessage: (req, res) => {
    const groupId = req.params.id;
    const newMessage = req.body.message;
    Group.find({ where: { id: groupId } }).then((foundGroup) => {
      foundGroup.messages.push(newMessage);
      foundGroup.update({
        messages: foundGroup.messages
      }, {
        where: {
          id: groupId
        }
      }).then((updatedGroup) => {
        res.send(`postmessage route, group id: ${JSON.stringify(updatedGroup)}`);
      });
    });
  },
  // Load messages from a particular group
  getmessages: (req, res) => {
    const groupId = req.params.id;
    Group.find({ where: { id: groupId } }).then((foundGroup) => {
      const groupMessages = foundGroup.messages;
      res.send(`Found messages ${groupMessages}`);
    });
  },
  // Get the list of members in a particular group
  getmembers: (req, res) => {
    const groupId = req.params.id;
    Group.find({ where: { id: groupId } }).then((foundGroup) => {
      const groupMembers = foundGroup.members;
      res.send(`Found Members ${groupMembers}`);
    });
  }
};
