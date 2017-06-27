import supertest from 'supertest';
import dotenv from 'dotenv';
import jasmine from 'jasmine';
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
        models.User.create(newUser).then(() => {
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
          expect(res.body).toEqual(jasmine.any(Array));
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
      }).then(() => {});
      done();
    });
    it('ensures proper response for successful user sign up', (done) => {
      return request
        .post('/api/user/signup')
        .send(fixtures.newUser)
        .expect((res) => {
          console.log('REQUEST DOT BODY');
          console.log(res.body);
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
            console.log('ABRABRABRABRA A;JF A;DJFA; DFJA DS;FJAD; FAJSDF ');
            console.log(createdUser.id);
            newGroup.userId = createdUser.id;
            console.log('THE NW GAYSDF ;ADFUA;DFUADF;');
            console.log(fixtures.newGroup);
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
      console.log('IDEYHAJALALALALALALALALALALLALALALALA');
      console.log(fixtures.newGroup);
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
    it('ensures all registered users can be loaded from the database', (done) => {
      return request
        .get('/api/group/members')
        .expect((res) => {
          expect(res.body).toEqual(jasmine.any(Array));
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
    beforeEach((done) => {
      done();
    });
    it('ensures successfull posting of messages to a particular group', (done) => {
      return request
        .post(`/api/${groupId}/message`)
        .send(fixtures.newMessage)
        .expect((res) => {
          expect(res.body.body).toEqual(fixtures.newMessage.body);
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
        .get(`/api/${groupId}/messages`)
        .expect((res) => {
          expect(res.body).toEqual(jasmine.any(Array));
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
        .get(`api/${groupId}/members`)
        .expect((res) => {
          expect(res.body).toEqual(jasmine.any(Array));
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
    beforeEach((done) => {
      done();
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
