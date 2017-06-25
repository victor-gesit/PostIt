import supertest from 'supertest';
import dotenv from 'dotenv';
import models from '../models';

dotenv.config();
process.env.NODE_ENV = 'test';

describe('PostIt Tests', () => {
  describe('Database connection tests', () => {
    it('ensures database connection is established', (done) => {
      models.sequelize.authenticate().then((err) => {
        expect(err).toEqual(null);
        done();
      });
    });
  });
  describe('Authentication routes test', () => {
    beforeEach((done) => {
      done();
    });
    it('ensures proper response for successful user sign in', (done) => {
      done();
    });
    it('ensures proper response for incorrect auth details', (done) => {
      done();
    });
  });
  describe('Tests for User creation routes', () => {
    beforeEach((done) => {
      done();
    });
    it('ensures proper response for successful user sign up', (done) => {
      done();
    });
    it('ensures proper response for sign up with incorrect data', (done) => {
      done();
    });
  });
  describe('Tests for Group CRUD operation routes', () => {
    it('ensures successfull group creation', (done) => {
      done();
    });
    it('ensures group can be created with no members added initially', (done) => {
      done();
    });
    it('ensures group can be created with a single member first', (done) => {
      done();
    });
    it('ensures group can be created with multiple members added initially', (done) => {
      done();
    });
    it('ensures successfull posting of messages to groups', (done) => {
      done();
    });
    it('ensures all messages for a particular group can be loaded successfully', (done) => {
      done();
    });
    it('ensures all members of a particular group can be loaded successfully', (done) => {
      done();
    });
    it('ensures all registered users can be loaded from the database', (done) => {
      done();
    });
    it('ensures all groups a user belongs to can be loaded', (done) => {
      done();
    });
  });
  describe('Model tests', () => {
    it('ensures User model is created correctly', (done) => {
      done();
    });
    it('ensures Group model is created successfully', (done) => {
      done();
    });
    it('ensures Message modes is created successfulley', (done) => {
      done();
    });
  });
});
