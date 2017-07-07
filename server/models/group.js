'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 100],
          msg: 'Creator name must have more than one characters'
        }
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 1000],
          msg: 'Title of group must have more than one characters'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [4, 1000],
          msg: 'Description of group must have more than four characters'
        }
      }
    },
  });
  Group.associate = (models) => {
    Group.belongsToMany(models.User, {
      through: 'UserGroup'
    });
    Group.hasMany(models.Message, {
      foreignKey: 'groupId',
    });
  };
  return Group;
};
