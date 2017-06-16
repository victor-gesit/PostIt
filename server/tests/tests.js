import supertest from 'supertest';
import app from '../index';

describe('PostIt Tests', () => {
  describe('Authentication routes test', () => {
    it('ensures proper response for successful user sign in', (done) => {

    });
    it('ensures proper response for incorrect auth details', (done) => {

    });
    it('ensures proper response for successful user sign up', (done) => {

    });
    it('ensures proper response for sign up with incorrect data', (done) => {

    });
  });
  describe('Group CRUD operation routes', () => {
    it('ensure proper response when group is created successfully', (done) => {

    });
    it('ensures proper response when messages are posted successfully', (done) => {

    });
    it('ensures all messages for a particular group can be read successfully', (done) => {

    });
    it('ensures all members of a particular group can be read successfully', (done) => {

    });
  });
});
