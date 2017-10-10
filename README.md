[![Build Status](https://travis-ci.org/victor4l/PostIt.svg?branch=develop)](https://travis-ci.org/victor4l/PostIt)
[![Coverage Status](https://coveralls.io/repos/github/victor4l/PostIt/badge.svg?branch=develop)](https://coveralls.io/github/victor4l/PostIt?branch=develop)
[![Code Climate](https://codeclimate.com/github/victor4l/PostIt/badges/gpa.svg)](https://codeclimate.com/github/victor4l/PostIt)
[![Issue Count](https://codeclimate.com/github/victor4l/PostIt/badges/issue_count.svg)](https://codeclimate.com/github/victor4l/PostIt)

# PostIt

## Introduction 
PostIt is a simple application that allows friends and colleagues create groups for communications. 
## Dependencies

### System Dependencies
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

### On Heroku
* A sample of the API is hosted [here](https://postit-api-victor.herokuapp.com/api). However, you could create your own copy on `Heroku`, to connect your own team members. A guide to hosting an app on 
`Heroku` is available [here](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)
* `Routes`: Use the same routes as specified in the instructions for Postman above.

## Documentation
A comprehensive swagger documentation is available [here](https://app.swaggerhub.com/apis/victor4l/post-it_application/1.0.0)
# Testing
To test the application codebase
* Run `npm test`, to view test output, and `gulp coverage` to view the code coverage

## License
This project is available for use and modification under the MIT License. See [here](https://github.com/victor4l/PostIt/blob/add-license-1/LICENSE) for the licence.


## FAQs
Check in the Wiki for the FAQs

## Limitations
This app, though awesome still has some shortcomings.
* Real time notifications are not set up.
* It is not an effective app for real time messaging. The socket.io implementation hasn't factor in a lot of the edge cases that come into play in realtime messaging applications.


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
