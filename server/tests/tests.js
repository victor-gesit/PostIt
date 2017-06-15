import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('PostIt Tests', () => {
  describe('Authentication routes test', () => {
    it('ensures proper response for successful user sign in', () => {

    });
    it('ensures proper response for incorrect auth details', () => {

    });
    it('ensures proper response for successful user sign up', () => {

    });
    it('ensures proper response for sign up with incorrect data', () => {

    });
  });
  describe('Group CRUD operation routes', () => {
    it('ensure proper response when group is created successfully', () => {

    });
    it('ensures proper response when messages are posted successfully', () => {

    });
    it('ensures all messages for a particular group can be read successfully', () => {

    });
    it('ensures all members of a particular group can be read successfully', () => {

    });
  });
});
