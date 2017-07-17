[![Build Status](https://travis-ci.org/victor4l/PostIt.svg?branch=develop)](https://travis-ci.org/victor4l/PostIt)
[![Coverage Status](https://coveralls.io/repos/github/victor4l/PostIt/badge.svg?branch=develop)](https://coveralls.io/github/victor4l/PostIt?branch=develop)
[![Code Climate](https://codeclimate.com/github/victor4l/PostIt/badges/gpa.svg)](https://codeclimate.com/github/victor4l/PostIt)
[![Issue Count](https://codeclimate.com/github/victor4l/PostIt/badges/issue_count.svg)](https://codeclimate.com/github/victor4l/PostIt)

# PostIt

## Introduction 
PostIt is a simple application that allows friends and colleagues create groups for communications. 
## Dependencies

### Key Dependencies
 This app's functionality depends on multiple NodeJS packages
* [NodeJS](https://nodejs.org/) This is a JavaScript runtime built on Chrome's V8 JavaScript engine. It is used for installing and managing the dependencies.
* [Express](https://expressjs.com/) This is used to create the web routes/endpoints.
* [Body-Parser](https://www.npmjs.com/package/body-parser) This is used for parsing the content of forms sent to the web app.
* [dotenv](https://www.npmjs.com/package/dotenv) This handles the management and dynamic assignment of environmental variables
* [body-parser](https://www.npmjs.com/package/body-parser) This parses the request into a body that can be accessed.
* [passportjs](passportjs.org) This handles user signin and signup, and user creation to the database
* [pg](https://www.npmjs.com/package/pg) PostgreSQL client for accessing PostgreSQL db with javascript
* [sequelize](https://www.npmjs.com/package/sequelize) Sequelize is a promise-based Node.js ORM for Postgres, MySQL, SQLite and Microsoft SQL Server.
* [pg-hstore](https://www.npmjs.com/package/pg-hstore) This serializes and deserializes json data to and from pg 

## Installation Guide
* Clone the repository [here](www.github.com/victor4l/postit)
* Download and install [Postgresql](https://www.postgresql.org/download/)
* If `pgadmin` was not automatically installed with the `Postgresql`installation, install it [here](https://www.pgadmin.org/)
* On `pgadmin`, create a database for the app. Modify the local copy of the [config](https://github.com/victor4l/PostIt/blob/develop/server/config/config.json) file to contain your database configurations

## Usage

### On local computer 
* Run `npm start` to run the app.
* Connect to the app on `Postman`, using port `8002`
#### Routes
* POST `/api/user/signup` Use this route to create an account. The following fields are required:
  * `firstName` The first name of the new user
  * `lastName`  The last name of the new user
  * `email`     Email address of the new user
  *  `phone`  The phone number of the new user
  * `password` A secure password

* POST `/api/user/signin` Use this route to sign in to the application. The following fields are required:
  * `email`     Email address of a registered user
  * `password` The password for the account

* POST `/api/group` Use this route to create a new group. The following fields are required:
  * `userId` The id of a registered user who is considered the creator of the group
  * `title`  The title of the group
  * `description`     A description of the purpose of the group
  * `initialMembers` (_Optional Field_) An email address, or array of email addresses of registered members, to be added to the newly created group. `Note`: The creator is automatically added to the group
  
  * Send a token in the header, with variable name `x-access-token`

* POST `/api/group/<groupId>/user` Use this route to add a user to a pre-existing group
  * `email` The email address of a user registered on the application
  * `groupId` The `id` of a group into which the user is to be added 
  * `adderId` The `id` of the person adding someone to the group. `NB`: The adder must be a member of the group

  * Send a token in the header, with variable name `x-access-token`

* POST `/api/group/<groupId>/message` Use this route to post a message to a group
  * `message` The body of the message to be posted to the group
  * `senderId` The id of the sender of the message. The sender must be a member of the group
  * `isComment` A string indicating whether the message is a comment or a post. The options are `comment` and `post` 

* GET `/api/group/<groupId>/messages` Use this route to load messages made to a group
  * Send a token in the header, with variable name `x-access-token`
* GET `/api/group/<groupId>/members` Use this route to load all the members of a particular group
  * Send a token in the header, with variable name `x-access-token`
* GET `/api/members` Use this route to load all registered members
  * Send a token in the header, with variable name `x-access-token`
* GET `/api/groups` Use this route to load all groups created on PostIt
  * Send a token in the header, with variable name `x-access-token`


### On Heroku
* A sample of the API is hosted [here](https://postit-api-victor.herokuapp.com/). However, you could create your own copy on `Heroku`, to connect your own team members. A guide to hosting an app on 
`Heroku` is available [here](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)
* `Routes`: Use the same routes as specified in the instructions for Postman above.


# Contributing to the Project
Contributions are welcome and appreciated. To contribute
* Fork this repository [here](https://github.com/victor4l/postit)
* Open a terminal and execute the following command to make a local copy
`$ git clone git@github.com:your-username/postit`
* Run this code to navigate into the folder `cd postit`
* Make your contributions to your local repo
* Add a connection to the original repo using
`$ git remote add repo_nickname git://github.com/victor4l/postit`
* Note that `repo_nickname` is a nickname you choose.
* Run `git remote -v` to verify that the connection is established
* Make your contributions to your local copy of the project
* Run `git add` and `git commit` to commit your contributions to the project
* Run `git push` to push your changes to your copy of the repository
* If you feel you've made a contribution that will improve the project, raise a Pull Request.
* Be descriptive enough about your contributions so other contributors will understand what you've done
* I look forward to your Pull Requests!
