import supertest from 'supertest';
import dotenv from 'dotenv';
import models from '../models';
import app from '../index';
import fixtures from '../fixtures/testFixtures';

dotenv.config();
const request = supertest(app);

describe('PostIt Tests', () => {
  describe('Database connection tests', () => {
    beforeEach((done) => {
      models.sequelize.sync();
      done();
    });
    it('ensures database connection is established', (done) => {
      models.sequelize.authenticate().then((err) => {
        expect(err).toEqual(null);
        done();
      });
    });
  });
  describe('Authentication routes test', () => {
    const newUser = fixtures.newUser;
    const registeredUser = fixtures.registeredUser;
    const userWithIncorrectPassword = fixtures.userWithIncorrectPassword;
    let userId;
    // Create a sample user and save in database
    beforeEach((done) => {
      models.User.destroy({
        where: {},
        cascade: true,
        truncate: true
      }).then(() => {
        models.User.create(newUser).then((createdUser) => {
          userId = createdUser.id;
          done();
        });
      });
    });
    it('ensures proper response for successful user sign in', (done) => {
      return request
        .post('/api/user/signin')
        .send(registeredUser)
        .expect((res) => {
          expect(res.body.user.email).toEqual(registeredUser.email);
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures proper response for incorrect auth details', (done) => {
      return request
        .post('/api/user/signin')
        .send(userWithIncorrectPassword)
        .expect((res) => {
          expect(res.body.message).toEqual('Error During Signin');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures all groups a user belongs to can be loaded', (done) => {
      return request
        .get(`/api/group/${userId}/groups`)
        .expect((res) => {
          const isArray = res.body instanceof Array;
          expect(isArray).toEqual(true);
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
  });
  describe('Tests for User creation routes', () => {
    // Clean up database
    beforeEach((done) => {
      models.User.destroy({
        where: {},
        truncate: true,
        cascade: true
      }).then(() => { done(); });
    });
    it('ensures proper response for successful user sign up', (done) => {
      return request
        .post('/api/user/signup')
        .send(fixtures.newUser)
        .expect((res) => {
          expect(res.body.error).toEqual(null);
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures proper response for sign up with incorrect data', (done) => {
      return request
        .post('/api/user/signup')
        .send(fixtures.newUserWithMissingData)
        .expect((res) => {
          expect(res.body.message).toEqual('Error During Signup');
          done();
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
  });
  describe('Tests for Group CRUD operation routes', () => {
    // Delete previous records and populate db with test data
    const newGroup = fixtures.newGroup;
    const newGroupWithMultipleMembers = fixtures.newGroupWithMultipleMembers;
    const newGroupWithSingleMember = fixtures.newGroupWithSingleMember;
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
          models.User.create(fixtures.newUser).then((createdUser) => {
            newGroup.userId = createdUser.id;
            newGroupWithMultipleMembers.userId = createdUser.id;
            newGroupWithSingleMember.userId = createdUser.id;
          }).then(() => {
            models.User.bulkCreate([fixtures.newUser2, fixtures.newUser3]).then(() => {
              done();
            });
          });
        });
      });
    });
    it('ensures successfull group creation', (done) => {
      return request
        .post('/api/group')
        .send(fixtures.newGroup)
        .expect((res) => {
          expect(res.body.title).toEqual(fixtures.newGroup.title);
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures group can be created with no members added initially', (done) => {
      return request
        .post('/api/group')
        .send(fixtures.newGroup)
        .expect((res) => {
          expect(res.body.title).toEqual(fixtures.newGroup.title);
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures group can be created with a single member added initially', (done) => {
      return request
        .post('/api/group')
        .send(fixtures.newGroupWithSingleMember)
        .expect((res) => {
          expect(res.body.title).toEqual(fixtures.newGroupWithSingleMember.title);
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures group can be created with multiple members added initially', (done) => {
      return request
        .post('/api/group')
        .send(fixtures.newGroupWithMultipleMembers)
        .expect((res) => {
          expect(res.body.title).toEqual(fixtures.newGroupWithMultipleMembers.title);
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
  });
  describe('General app activities', () => {
    it('ensures sensible response for incorrect route', (done) => {
      return request
        .get('/unregistered')
        .expect({ message: 'Api up and running' })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures all registered users can be loaded from the database', (done) => {
      return request
        .get('/api/group/members')
        .expect((res) => {
          const isArray = res.body instanceof Array;
          expect(isArray).toEqual(true);
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
  });
  describe('Tests for CRUD activities in a particular group', () => {
    let groupId;
    const newMessage = fixtures.newMessage;
    const newMessageForRoute = fixtures.newMessageForRoute;
    beforeEach((done) => {
      models.Group.destroy({
        where: {},
        cascade: true,
        truncate: true
      }).then(() => {
        models.Group.create(fixtures.newGroup).then((createdGroup) => {
          groupId = createdGroup.id;
          newMessage.groupId = createdGroup.id;
          models.Message.create(newMessage).then(() => {
            done();
          });
        });
      });
    });
    it('ensures successfull posting of messages to a particular group', (done) => {
      return request
        .post(`/api/group/${groupId}/message`)
        .send(newMessageForRoute)
        .expect((res) => {
          expect(res.body.body).toEqual(newMessageForRoute.message);
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures all messages for a particular group can be loaded successfully', (done) => {
      return request
        .get(`/api/group/${groupId}/messages`)
        .expect((res) => {
          const isArray = res.body instanceof Array;
          expect(isArray).toEqual(true);
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures all members of a particular group can be loaded successfully', (done) => {
      return request
        .get(`/api/group/${groupId}/members`)
        .expect((res) => {
          const isArray = res.body instanceof Array;
          expect(isArray).toEqual(true);
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
  });
  describe('Model tests', () => {
    const newUser = fixtures.newUser;
    const newGroup = fixtures.newGroup;
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
      done();
    });
    it('ensures Group model is created successfully', (done) => {
      models.Group.create(newGroup).then((createdGroup) => {
        expect(createdGroup.createdBy).toEqual('Jane Doe');
        done();
      });
      done();
    });
    it('ensures Message model is created successfully', (done) => {
      models.Message.create(newMessage).then((createdMessage) => {
        expect(createdMessage.sentBy).toEqual('John Smith');
      });
      done();
      return app.close();
    });
  });
});
