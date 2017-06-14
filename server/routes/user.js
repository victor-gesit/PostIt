import Sequelize from 'sequelize';
import passport from 'passport';

import '../auth/passport';


export default {
  signin: (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  },
  signup: (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
  }
};
