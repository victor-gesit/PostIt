import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import models from '../models';
import app from '../index';
import fixtures from '../fixtures/testFixtures';


dotenv.config();
const request = supertest(app);

describe('Authentication Tests', () => {
  let token;
  // Sync database before commencing testing
  beforeEach((done) => {
    models.sequelize.sync().then(() => {
      done();
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
          // Instantiate a token for the rest of the test process
          token = res.body.user.token;
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
    it('ensures user info can be gotten if valid token is provided', (done) => {
      request
        .get('/api/token')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.body.message).toEqual('Token valid, but user not found');
          done();
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures user info cannot be gotten if invalid token is provided', (done) => {
      const jwtSecret = process.env.JWT_SECRET;
      const newToken = jwt.sign({ id: 'invalidUserId' }, jwtSecret, {
        expiresIn: '2 days' // expires in 48 hours
      });
      request
        .get('/api/token')
        .set('x-access-token', newToken)
        .expect((res) => {
          expect(res.body.message).toEqual('Invalid User Id');
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
  describe('Authentication routes test', () => {
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
        request
          .post('/api/user/signup')
          .send(fixtures.newUser)
          .expect((res) => {
            // Instantiate a token for the rest of the test process
            token = res.body.user.token;
          })
        .end((err) => {
          if (err) {
            return done(err);
          }
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
    it('ensures proper response for successful user sign in with google account', (done) => {
      request
        .post('/api/user/google/login')
        .send(fixtures.googleUser)
        .expect((res) => {
          expect(res.body.user.email).toEqual(fixtures.googleUser.email);
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures user with email and password enters those, instead of using google auth', (done) => {
      request
        .post('/api/user/google/login')
        .send(registeredUser)
        .expect((res) => {
          expect(res.body.message).toEqual('That email address is associated with an account. Please sign in');
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
        .get('/api/user/groups')
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
    it('ensures error response if an invalid userId is encoded in token', (done) => {
      const jwtSecret = process.env.JWT_SECRET;
      const invalidToken = jwt.sign({ id: 'invalidUserId' }, jwtSecret, {
        expiresIn: '2 days' // expires in 48 hours
      });
      request
        .get('/api/user/groups')
        .set('x-access-token', invalidToken)
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
  });
});
