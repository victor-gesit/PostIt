import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 100],
          msg: 'First name of user must have more than one characters, no leading or trailing spaces'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 100],
          msg: 'Last name of user must have more than one characters, no leading or trailing spaces'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Email is already in use'
      },
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'An invalid email was supplied'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [7, 1000],
          msg: 'Password must have 8 or more characters, , no leading or trailing spaces'
        }
      }
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        len: {
          args: [7, 19],
          msg: 'Phone number length is invalid'
        },
        not: {
          args: ['[a-z]', 'i'],
          msg: 'Phone number can only contain numbers'
        }
      }
    }
  });
  User.associate = (models) => {
    User.belongsToMany(models.Group, {
      through: 'UserGroup'
    });
    User.belongsToMany(models.Message, {
      through: 'MessageRead'
    });
  };
  User.beforeSave((user) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(5), null);
  });
  return User;
};
