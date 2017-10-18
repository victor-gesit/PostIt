import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import models from '../models';
import app from '../index';
import fixtures from '../fixtures/testFixtures';


dotenv.config();
const request = supertest(app);

describe('Group Tests', () => {
  const jwtSecrt = process.env.JWT_SECRET;
  let creatorId;
  const token = jwt.sign({ id: '56e930ea-cbdf-4ba1-a881-58fd1409139b' }, jwtSecrt, {
    expiresIn: '2 days' // expires in 48 hours
  });
  describe('Connection test', () => {
    // Sync database before commencing testing
    beforeEach((done) => {
      models.sequelize.sync().then(() => {
        done();
      });
    });
    it('ensures a database connection', (done) => {
      models.sequelize.authenticate().then(() => {
        done();
      }).catch((err) => {
        done(err);
      });
      done();
    });
  });
  describe('Group members and messages fetch tests', () => {
    let groupId;
    // userId is gotten from token generated during authentication
    let newToken;
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
  describe('Tests for Group CRUD operation routes', () => {
    // Delete previous records and populate db with test data
    let groupId;
    let aCreatedUser;
    let idToDelete;
    let newToken, newToken2;
    const jwtSecret = process.env.JWT_SECRET;
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
            creatorId = createdUser.id;
            newToken = jwt.sign({ id: createdUser.id }, jwtSecret, {
              expiresIn: '2 days' // expires in 48 hours
            });
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
            models.User.bulkCreate([fixtures.newUser2, fixtures.newUser3]).then((newGuys) => {
              idToDelete = newGuys[0].id;
              newToken2 = jwt.sign({ id: newGuys[1].id }, jwtSecret, {
                expiresIn: '2 days' // expires in 48 hours
              });
              models.Group.create(newGroup).then((createdGroup) => {
                createdGroup.addUsers([aCreatedUser, ...newGuys]).then(() => {
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
        .set('x-access-token', newToken)
        .send(fixtures.newGroup2)
        .expect((res) => {
          expect(res.body.createdGroup.title)
          .toEqual(fixtures.newGroup2.title);
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
        .set('x-access-token', newToken)
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
        .set('x-access-token', newToken)
        .send(fixtures.newGroup2)
        .expect((res) => {
          expect(res.body.createdGroup.title)
          .toEqual(fixtures.newGroup2.title);
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
        .set('x-access-token', newToken)
        .send(fixtures.newGroupWithSingleMember)
        .expect((res) => {
          expect(res.body.createdGroup.title)
          .toEqual(fixtures.newGroupWithSingleMember.title);
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
        .set('x-access-token', newToken)
        .send(fixtures.newGroupWithMultipleMembers)
        .expect((res) => {
          expect(res.body.createdGroup.title)
          .toEqual(fixtures.newGroupWithMultipleMembers.title);
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures non group member cannot delete a group member', (done) => {
      request
        .delete(`/api/group/${groupId}/members`)
        .set('x-access-token', token)
        .send({ idToDelete })
        .expect((res) => {
          expect(res.body.message)
          .toEqual('You are not a member of this group');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures only group creator can remove a group member', (done) => {
      request
        .delete(`/api/group/${groupId}/members`)
        .set('x-access-token', newToken2)
        .send({ idToDelete })
        .expect((res) => {
          expect(res.body.message)
          .toEqual('You are not the creator of this group. You cannot delete members');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures error is returned if an invalid UUID group id is supplied, when removing group members', (done) => {
      request
        .delete('/api/group/invalidGroupId/members')
        .set('x-access-token', newToken2)
        .send({ idToDelete })
        .expect((res) => {
          expect(res.body.message)
          .toEqual('Invalid Group Id');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures error is returned if a nonexistent group id is supplied, when removing group members', (done) => {
      request
        .delete('/api/group/56e930ea-cbdf-4ba1-a881-58fd1409139b/members')
        .set('x-access-token', newToken2)
        .send({ idToDelete })
        .expect((res) => {
          expect(res.body.message)
          .toEqual('Group not found');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures group member can be deleted successfully', (done) => {
      request
        .delete(`/api/group/${groupId}/members`)
        .set('x-access-token', newToken)
        .send({ idToDelete })
        .expect((res) => {
          expect(res.body.message)
          .toEqual('Deleted successfully');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures group creator cannot be deleted from group', (done) => {
      request
        .delete(`/api/group/${groupId}/members`)
        .set('x-access-token', newToken)
        .send({ idToDelete: creatorId })
        .expect((res) => {
          expect(res.body.message)
          .toEqual('You cannot delete the group creator. Delete the group instead, if you created it.');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures group members can be deleted, if supplied in an array', (done) => {
      request
        .delete(`/api/group/${groupId}/members`)
        .set('x-access-token', newToken)
        .send({ idToDelete: [idToDelete] })
        .expect((res) => {
          expect(res.body.message)
          .toEqual('Deleted successfully');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures error is returned if the users to be removed do not belong to the group', (done) => {
      request
        .delete(`/api/group/${groupId}/members`)
        .set('x-access-token', newToken)
        .send({ idToDelete: '56e930ea-cbdf-4ba1-a881-58fd1409139b' })
        .expect((res) => {
          expect(res.body.message)
          .toEqual('The person(s) to be deleted do not belong to the group');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures group member can leave a group', (done) => {
      request
        .delete(`/api/group/${groupId}/leave`)
        .set('x-access-token', newToken2)
        .send({ idToDelete })
        .expect((res) => {
          expect(res.body.message)
          .toEqual('Left group successfully');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures error is returned if non group member attempt to leave group', (done) => {
      request
        .delete(`/api/group/${groupId}/leave`)
        .set('x-access-token', token)
        .send({ idToDelete })
        .expect((res) => {
          expect(res.body.message)
          .toEqual('You are not a member of this group');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures group creator cannot leave a group', (done) => {
      request
        .delete(`/api/group/${groupId}/leave`)
        .set('x-access-token', newToken)
        .send({ idToDelete })
        .expect((res) => {
          expect(res.body.message)
          .toEqual('You cannot leave a group you created. Delete group instead');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures members of a group can search the group list', (done) => {
      request
        .get(`/api/group/${groupId}/search?searchQuery=gesit`)
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
    it('ensures non members of a group cannot search the group list', (done) => {
      request
        .get(`/api/group/${groupId}/search?searchQuery=gesit`)
        .set('x-access-token', token)
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
    it('ensures error is returned if user supplies invalid search query', (done) => {
      request
        .get(`/api/group/${groupId}/search?searchQuery=gesit&offset=a`)
        .set('x-access-token', newToken)
        .expect((res) => {
          expect(res.body.message).toEqual('Invalid query in url');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures error is returned if group Id is invalid UUID', (done) => {
      request
        .get('/api/group/invalidGroupId/search?searchQuery=gesit&offset=1')
        .set('x-access-token', newToken)
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
    it('ensures error is returned if group does not exits', (done) => {
      request
        .get('/api/group/56e930ea-cbdf-4ba1-a881-58fd1409139b/search?searchQuery=gesit&offset=1')
        .set('x-access-token', newToken)
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
    it('ensures non creator of a group cannot delete the group', (done) => {
      request
        .delete(`/api/group/${groupId}/delete`)
        .set('x-access-token', newToken2)
        .expect((res) => {
          expect(res.body.message).toEqual('You are not the creator of this group');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures error is thrown, if a non existent group is to be deleted', (done) => {
      request
        .delete('/api/group/56e930ea-cbdf-4ba1-a881-58fd1409139b/delete')
        .set('x-access-token', newToken)
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
    it('ensures creator of a group can delete the group', (done) => {
      request
        .delete(`/api/group/${groupId}/delete`)
        .set('x-access-token', newToken)
        .expect((res) => {
          expect(res.body.message).toEqual('Group deleted successfully');
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
    const jwtSecret = process.env.JWT_SECRET;
    let newToken;
    let groupId;
    let messageId;
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
            newToken = jwt.sign({ id: createdUser.id }, jwtSecret, {
              expiresIn: '2 days' // expires in 48 hours
            });
            models.Group.create(fixtures.newGroup).then((createdGroup) => {
              createdGroup.addUser(createdUser).then(() => {
                groupId = createdGroup.id;
                newMessage.groupId = createdGroup.id;
                newMessageForRoute.senderId = createdUser.id;
                models.Message.create(newMessage).then((createdMessage) => {
                  messageId = createdMessage.id;
                  done();
                });
              });
            });
          });
        });
      });
    });
    it('ensures member of a group can post message to the group', (done) => {
      request
        .post(`/api/group/${groupId}/message`)
        .set('x-access-token', newToken)
        .send(newMessageForRoute)
        .expect((res) => {
          expect(res.body.success).toEqual(true);
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures non member of a group cannot post message to the group', (done) => {
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
    it('ensures those who have read a message can be loaded', (done) => {
      request
        .get(`/api/group/${messageId}/message/seenby`)
        .set('x-access-token', newToken)
        .expect((res) => {
          const isArray = res.body.seenBy instanceof Array;
          expect(isArray).toEqual(true);
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
          expect(res.body).toEqual({ success: false,
            message: 'User does not belong to this group' });
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
          expect(res.body).toEqual({ success: false,
            message: 'User does not belong to this group' });
        })
        .end((err) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });
});
