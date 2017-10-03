import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import models from '../models';
import app from '../index';
import fixtures from '../fixtures/testFixtures';

dotenv.config();
const request = supertest(app);


describe('PostIt Tests', () => {
  let token;
  describe('Test suite', () => {
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
    });
  });
  describe('Tests for User creation routes', () => {
    // Clean up database before commencing testing
    beforeEach((done) => {
      models.User.destroy({
        where: {},
        truncate: true,
        cascade: true
      }).then(() => { done(); });
    });
    it('ensures proper response for successful user sign up', (done) => {
      request
        .post('/api/user/signup')
        .send(fixtures.newUser)
        .expect((res) => {
          token = res.body.token; // Instantiate a token for the rest of the test process
          expect(res.body.message).toEqual('Successful Sign up');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures proper response for sign up with incomplete data', (done) => {
      request
        .post('/api/user/signup')
        .send(fixtures.newUserWithMissingData)
        .expect((res) => {
          expect(res.body.message).toEqual('Missing credentials');
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
  describe('Testing routes with incorrect data', () => {
    const newUser = fixtures.newUser;
    const newMessage = fixtures.newMessageForRoute;
    // Clean up User table, and then create  sample user
    beforeEach((done) => {
      models.User.destroy({
        where: {},
        cascade: true,
        truncate: true
      }).then(() => {
        models.User.create(newUser).then((createdUser) => {
          newMessage.senderId = createdUser.id;
          done();
        });
      });
    });
    it('returns an error if a user is to be added to a non-existent group id', (done) => {
      request
        .post('/api/group/unknowngroupid/user')
        .set('x-access-token', token)
        .send(fixtures.newUser)
        .expect((res) => {
          expect(res.body.message).toEqual('Group not found');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('returns an error if token is not supplied', (done) => {
      request
        .post('/api/group/SomeRandomGroupId/user')
        .send(fixtures.newUser)
        .expect((res) => {
          expect(res.body.message).toEqual('No token provided');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('returns an error if an invalid token is supplied', (done) => {
      request
        .post('/api/group/SomeRandomGroupId/user')
        .set('x-access-token', 'someInvalidToken')
        .send(fixtures.newUser)
        .expect((res) => {
          expect(res.body.message).toEqual('Could not authenticate token');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('returns an error when an invalid UUID is supplied for user id during search for groups', (done) => {
      request
        .get('/api/user/invaliduuidcode/groups')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.body.message).toEqual('Invalid User Id');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('returns an error when an invalid UUID is supplied for group id when loading messages', (done) => {
      request
        .get('/api/group/invalidgroupid/messages')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.body.message).toEqual('Invalid Group Id');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('returns an error when an invalid UUID is supplied for group id when loading group members', (done) => {
      request
        .get('/api/group/invalidgroupid/members')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.body.message).toEqual('Invalid Group Id');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('returns an error when an invalid UUID is supplied for group id when posting message to a grouhp', (done) => {
      request
        .post('/api/group/invalidgroupid/message')
        .set('x-access-token', token)
        .send(fixtures.newMessageForRoute)
        .expect((res) => {
          expect(res.body.message).toEqual('Invalid Group Id');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('returns error when a non-existent user attempts to create a group', (done) => {
      request
        .post('/api/group/')
        .set('x-access-token', token)
        .send({
          userId: '7229aca1-55f4-4873-86d3-0774ec7a0d7e', // Unregisted user Id
          title: 'New Group',
          description: 'A group created by an unregistered user'
        })
        .expect((res) => {
          expect(res.body.message).toEqual('User not found');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('returns an error if a message is to be posted to a non-existent group id', (done) => {
      request
        .post('/api/group/34998203-58d2-4854-9003-8092e5035ae8/message') // Unregistered group id
        .set('x-access-token', token)
        .send(newMessage)
        .expect((res) => {
          expect(res.body.message).toEqual('Group not found');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('returns an error if you attempt to load messages from a non-existent group id', (done) => {
      request
        .get('/api/group/34998203-58d2-4854-9003-8092e5035ae8/messages') // Unregistered group id
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.body.message).toEqual('Group not found');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('returns an error if you attempt to load members from a non-existent group id', (done) => {
      request
        .get('/api/group/34998203-58d2-4854-9003-8092e5035ae8/members') // Unregistered group id
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.body.message).toEqual('Group not found');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('returns error if you attempt to load the groups for a non-existent user', (done) => {
      request
        .get('/api/user/34998203-58d2-4854-9003-8092e5035ae8/groups')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.body.message).toEqual('User not found');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
  });
  describe('Group members and messages fetch tests', () => {
    let groupId;
    let newToken; // userId is gotten from token generated during authentication
    const groupToBeCreated = fixtures.newGroup;
    const jwtSecret = process.env.JWT_SECRET;
    beforeEach((done) => {
      models.Group.destroy({
        where: {},
        cascade: true,
        truncate: true
      }).then(() => {
        models.User.destroy({
          where: {},
          cascade: true,
          truncate: true
        }).then(() => {
          models.User.create(fixtures.newUser).then((createdUser) => {
            groupToBeCreated.creatorEmail = createdUser.email;
            models.Group.create(groupToBeCreated).then((createdGroup) => {
              createdGroup.addUser(createdUser).then(() => {
                // Generate a jwt token and make the created user details it's payload
                const newUser = {
                  firstName: createdUser.firstName,
                  lastName: createdUser.lastName,
                  email: createdUser.email,
                  phone: createdUser.phone,
                  id: createdUser.id
                };
                newToken = jwt.sign(newUser, jwtSecret, {
                  expiresIn: '2 days' // expires in 48 hours
                });
                groupId = createdGroup.id;
                done();
              });
            });
          });
        });
      });
    });
    it('ensures group members can load messages for a group they belong to', (done) => {
      request
        .get(`/api/group/${groupId}/messages`)
        .set('x-access-token', newToken)
        .expect((res) => {
          const isArray = res.body.rows instanceof Array;
          expect(isArray).toEqual(true);
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures members of a group can load the group list', (done) => {
      request
        .get(`/api/group/${groupId}/members`)
        .set('x-access-token', newToken)
        .expect((res) => {
          const isArray = res.body.rows instanceof Array;
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
  describe('Authentication routes test', () => {
    const newUser = fixtures.newUser;
    const registeredUser = fixtures.registeredUser;
    const userWithIncorrectPassword = fixtures.userWithIncorrectPassword;
    let userId;
    // Clean up User table, and then create  sample user
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
      request
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
      request
        .post('/api/user/signin')
        .send(userWithIncorrectPassword)
        .expect((res) => {
          expect(res.body.message).toEqual('Invalid password');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures proper response if user creates a group with incomplete data', (done) => {
      request
        .post('/api/group')
        .set('x-access-token', token)
        .send({ creatorId: userId })
        .expect((res) => {
          expect(res.body.message).toEqual('Incomplete fields');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures all groups a user belongs to can be loaded', (done) => {
      request
        .get(`/api/user/${userId}/groups`)
        .set('x-access-token', token)
        .expect((res) => {
          const isArray = res.body.rows instanceof Array;
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
  describe('Tests for Group CRUD operation routes', () => {
    // Delete previous records and populate db with test data
    let groupId;
    let aCreatedUser;
    const newGroup = fixtures.newGroup;
    const newGroup2 = fixtures.newGroup2;
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
            aCreatedUser = createdUser;
            newGroup.creatorId = createdUser.id;
            newGroup.creatorEmail = createdUser.email;
            newGroup2.creatorId = createdUser.id;
            newGroup2.creatorEmail = createdUser.email;
            newGroupWithMultipleMembers.creatorId = createdUser.id;
            newGroupWithMultipleMembers.creatorEmail = createdUser.email;
            newGroupWithSingleMember.creatorId = createdUser.id;
            newGroupWithSingleMember.creatorEmail = createdUser.email;
          }).then(() => {
            models.User.bulkCreate([fixtures.newUser2, fixtures.newUser3]).then(() => {
              models.Group.create(newGroup).then((createdGroup) => {
                createdGroup.addUser(aCreatedUser).then(() => {
                  groupId = createdGroup.id;
                  done();
                });
              });
            });
          });
        });
      });
    });
    it('ensures successfull group creation', (done) => {
      request
        .post('/api/group')
        .set('x-access-token', token)
        .send(fixtures.newGroup2)
        .expect((res) => {
          expect(res.body.createdGroup.title).toEqual(fixtures.newGroup2.title);
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures proper response when an invalid user id is supplied during group creation', (done) => {
      newGroup2.creatorId = 'invaliduserid';
      request
        .post('/api/group')
        .set('x-access-token', token)
        .send(newGroup2)
        .expect((res) => {
          expect(res.body.message).toEqual('Supply a valid user id');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures a user can be added to a group after it is created', (done) => {
      request
        .post(`/api/group/${groupId}/user`)
        .set('x-access-token', token)
        .send({ email: 'taiwok@yahoo.com', adderId: aCreatedUser.id })
        .expect((res) => {
          expect(res.body[0].email).toEqual('taiwok@yahoo.com');
        })
        .end((err) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it('ensures proper response when a non member of a group attempts to add someone to the group', (done) => {
      request
        .post(`/api/group/${groupId}/user`)
        .set('x-access-token', token)
        .send({ email: 'taiwok@yahoo.com', adderId: '34998203-58d2-4854-9003-8092e5035ae8' }) // Unknown ID
        .expect((res) => {
          expect(res.body.message).toEqual('Adder is not member of the group');
        })
        .end((err) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it('returns an empty object if an unregistered user is to be added to a group', (done) => {
      request
        .post(`/api/group/${groupId}/user`)
        .set('x-access-token', token)
        .send({ email: 'unregistered@email.com', adderId: aCreatedUser.id })
        .expect({ success: false, message: 'User not found' })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures group can be created with no members added initially', (done) => {
      request
        .post('/api/group')
        .set('x-access-token', token)
        .send(fixtures.newGroup2)
        .expect((res) => {
          expect(res.body.createdGroup.title).toEqual(fixtures.newGroup2.title);
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures group can be created with a single member added initially', (done) => {
      request
        .post('/api/group')
        .set('x-access-token', token)
        .send(fixtures.newGroupWithSingleMember)
        .expect((res) => {
          expect(res.body.createdGroup.title).toEqual(fixtures.newGroupWithSingleMember.title);
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures group can be created with multiple members added initially', (done) => {
      request
        .post('/api/group')
        .set('x-access-token', token)
        .send(fixtures.newGroupWithMultipleMembers)
        .expect((res) => {
          expect(res.body.createdGroup.title).toEqual(fixtures.newGroupWithMultipleMembers.title);
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
      request
        .get('/unregistered')
        .expect({ message: 'Api up and running. Check documentation for appropriate routes' })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures sensible response for incorrect route', (done) => {
      request
        .get('/api/*')
        .expect({ message: 'Api up and running. Check documentation for appropriate routes' })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures all registered users can be loaded from the database', (done) => {
      request
        .get('/api/members')
        .set('x-access-token', token)
        .expect((res) => {
          const isArray = res.body.rows instanceof Array;
          expect(isArray).toEqual(true);
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures all created groups can be loaded from the database', (done) => {
      request
        .get('/api/groups')
        .set('x-access-token', token)
        .expect((res) => {
          const isArray = res.body.rows instanceof Array;
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
        models.User.destroy({
          where: {},
          cascade: true,
          truncate: true
        }).then(() => {
          models.User.create(fixtures.newUser).then((createdUser) => {
            models.Group.create(fixtures.newGroup).then((createdGroup) => {
              createdGroup.addUser(createdUser).then(() => {
                groupId = createdGroup.id;
                newMessage.groupId = createdGroup.id;
                newMessageForRoute.senderId = createdUser.id;
                models.Message.create(newMessage).then(() => {
                  done();
                });
              });
            });
          });
        });
      });
    });
    it('ensures successfull posting of messages to a particular group', (done) => {
      request
        .post(`/api/group/${groupId}/message`)
        .set('x-access-token', token)
        .send(newMessageForRoute)
        .expect((res) => {
          expect(res.body.message.body).toEqual(newMessageForRoute.body);
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures successfull posting of messages to a group, with isComment field not defined', (done) => {
      newMessageForRoute.isComment = undefined;
      request
        .post(`/api/group/${groupId}/message`)
        .set('x-access-token', token)
        .send(newMessageForRoute)
        .expect((res) => {
          expect(res.body.message.body).toEqual(newMessageForRoute.body);
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures non member of a group cannot post message to the group', (done) => {
      newMessageForRoute.senderId = '34998203-58d2-4854-9003-8092e5035ae8';
      request
        .post(`/api/group/${groupId}/message`)
        .set('x-access-token', token)
        .send(newMessageForRoute)
        .expect((res) => {
          expect(res.body.message).toEqual('User does not belong to this group');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures proper response when an invalid UUID is supplied for user id when posting a message', (done) => {
      newMessageForRoute.senderId = 'thisIsInvalidUUID';
      request
        .post(`/api/group/${groupId}/message`)
        .set('x-access-token', token)
        .send(newMessageForRoute)
        .expect((res) => {
          expect(res.body.message).toEqual('Invalid User Id');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures proper response when incomplete fields are supplied when posting a message', (done) => {
      newMessageForRoute.body = undefined;
      request
        .post(`/api/group/${groupId}/message`)
        .set('x-access-token', token)
        .send(newMessageForRoute)
        .expect((res) => {
          expect(res.body.message).toEqual('Incomplete fields. Specify senderId, message and priority (normal, urgent or critical)');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures non members of a group cannot view messages belonging to the group', (done) => {
      request
        .get(`/api/group/${groupId}/messages`)
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.body).toEqual({ success: false, message: 'User does not belong to this group' });
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures non members of a group cannot view the group list', (done) => {
      request
        .get(`/api/group/${groupId}/members`)
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.body).toEqual({ success: false, message: 'User does not belong to this group' });
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
        // Close connections to server and database
        app.close();
        models.sequelize.close();
        done();
      });
    });
  });
});
