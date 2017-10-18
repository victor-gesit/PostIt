import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import sinon from 'sinon';
import nodemailer from 'nodemailer';
import http from 'http';
import io from 'socket.io';
import models from '../models';
import app from '../index';
import fixtures from '../fixtures/testFixtures';
import sendEmail from '../controllers/utils/sendEmail';
import socketServer from '../socketServer';


dotenv.config();
const request = supertest(app);

describe('General App Tests', () => {
  let token;
  const jwtSecret = process.env.JWT_SECRET;
  beforeEach((done) => {
    models.User.destroy({
      where: {},
      truncate: true,
      cascade: true
    }).then(() => {
      models.User.create(fixtures.newUser).then((createdUser) => {
        token = jwt.sign({ id: createdUser.id }, jwtSecret, {
          expiresIn: '2 days' // expires in 48 hours
        });
        done();
      });
    });
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
        .get('/api/user/groups')
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
  describe('General app activities', () => {
    let newToken;
    const jwtSecret = process.env.JWT_SECRET;

    beforeEach((done) => {
      models.User.destroy({
        where: {},
        truncate: true,
        cascade: true
      }).then(() => {
        models.User.create(fixtures.newUser).then((createdUser) => {
          newToken = jwt.sign({ id: createdUser.id }, jwtSecret, {
            expiresIn: '2 days' // expires in 48 hours
          });
          done();
        });
      });
    });
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
    it('ensures user search can be carried out successful', (done) => {
      request
        .get('/api/search?searchQuery=victor')
        .set('x-access-token', newToken)
        .expect((res) => {
          const isArray = res.body.users.rows instanceof Array;
          expect(isArray).toEqual(true);
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('calls the method to send a user a password recovery email', (done) => {
      const stub = sinon.stub(nodemailer, 'createTransport');
      stub.returns({
        sendMail: (mailOptions = {}, cb) => cb(null)
      });
      request
        .post('/api/password/recover')
        .send({ email: 'taiwok@yahoo.com' })
        .expect((res) => {
          stub.restore();
          expect(res.body.message).toEqual('A password reset link has been sent to your email');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('throws an error when there is no internet connection during password recovery', (done) => {
      const stub = sinon.stub(nodemailer, 'createTransport');
      stub.returns({
        sendMail: (mailOptions = {}, cb) => cb({ error: true })
      });
      request
        .post('/api/password/recover')
        .send({ email: 'taiwok@yahoo.com' })
        .expect((res) => {
          stub.restore();
          expect(res.body.message).toEqual('Could not send email. Check your internet connection');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures user password can be reset password successful', (done) => {
      request
        .post('/api/password/reset')
        .send({ newPassword: 'taiwookonkwo' })
        .set('x-access-token', newToken)
        .expect((res) => {
          expect(res.body.message).toEqual('Password changed successfully');
        })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures an error message is returned if password reset token is expired, or invalid', (done) => {
      request
        .post('/api/password/reset')
        .send({ newPassword: 'taiwookonkwo' })
        .set('x-access-token', 'invalidtoken')
        .expect((res) => {
          expect(res.body.message).toEqual('The password recovery link has expired.');
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
    it('ensures error message is sent if invalid query is present in url when loading all groups', (done) => {
      request
        .get('/api/groups?limit=a')
        .set('x-access-token', token)
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
    it('renders a html document when the root path is accessed', (done) => {
      request
        .get('/')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.text).toEqual('<!DOCTYPE html>\n<html lang = "en">\n<head>\n  <meta charset = "UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <link rel="stylesheet" type="text/css" href="build/styles.css">\n  <title>PostIt</title>\n</head>\n\n<body>\n  <div id = "app"></div>\n  <script src = "./build/bundle.js"></script>\n</body>\n</html>');
        })
        .end((err) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });
  describe('sendEmail method', () => {
    it('sends emails to members of a group', () => {
      const stub = sinon.stub(nodemailer, 'createTransport');
      stub.returns({
        sendMail: (mailOptions = {}, cb) => cb(null, { response: 'Email sent' })
      });
      sendEmail({ title: 'A group', id: '12345' }, [{ email: 'me@you.com' }], 'An email message', (err, response) => {
        stub.restore();
        expect(response).toEqual('Email sent');
      });
    });
    it('sends an error message when sending mails fails', () => {
      const stub = sinon.stub(nodemailer, 'createTransport');
      stub.returns({
        sendMail: (mailOptions = {}, cb) => cb({ response: 'Email sending failed' })
      });
      sendEmail({ title: 'A group', id: '12345' }, [{ email: 'me@you.com' }], 'An email message', (err) => {
        stub.restore();
        expect(err).toEqual({ response: 'Email sending failed' });
          // Close connections to server and database
      });
    });
  });
  describe('socketServer method', () => {
    it('is called when the application loads, to start a socket.io server', () => {
      const stub = sinon.stub(io({}), 'on');
      stub.returns((event = {}, cb) => cb({ response: 'Email sending failed' })
      );
      socketServer({}, {});
      app.close();
      models.sequelize.close();
    });
  });
});
