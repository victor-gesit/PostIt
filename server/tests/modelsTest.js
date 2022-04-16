import dotenv from 'dotenv';
import models from '../models';
import fixtures from '../fixtures/testFixtures';


dotenv.config();

describe('DB Tests', () => {
  describe('Connection test', () => {
    // Sync database before commencing testing
    beforeEach((done) => {
      models.sequelize.sync().then(() => {
        done();
      });
    });
    it('establishes a database connection', (done) => {
      models.sequelize.authenticate().then(() => {
        done();
      }).catch((err) => {
        done(err);
      });
      done();
    });
  });
  describe('Model test', () => {
    const newUser = fixtures.newUser;
    const newGroup2 = fixtures.newGroup2;
    const newMessage = fixtures.newMessage;
    let groupId;
    beforeEach((done) => {
      models.User.destroy({
        where: {},
        truncate: true,
        cascade: true
      }).then(() => {
        models.Group.destroy({
          where: {},
          truncate: true,
          cascade: true
        }).then(() => {
          models.Group.create(fixtures.newGroup).then((createdGroup) => {
            groupId = createdGroup.id;
            newMessage.groupId = groupId;
            done();
          });
        });
      });
    });
    it('ensures User model is created correctly', (done) => {
      models.User.create(newUser).then((createdUser) => {
        expect(createdUser.email).toEqual(newUser.email);
        done();
      });
    });
    it('ensures Group model is created successfully', (done) => {
      models.Group.create(newGroup2).then((createdGroup) => {
        expect(createdGroup.createdBy).toEqual('John Doe');
        done();
      });
    });
    it('ensures Message model is created successfully', (done) => {
      models.Message.create(newMessage).then((createdMessage) => {
        expect(createdMessage.sentBy).toEqual('John Smith');
        done();
      });
    });
  });
});
