'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    sentBy: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 100],
          msg: 'Name of sender must have more than 1 characters'
        }
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [1, 100000],
          msg: 'Body of message must have more than 1 characters'
        }
      }
    },
    isComment: {
      type: DataTypes.BOOLEAN
    }
  });
  Message.associate = (models) => {
    Message.belongsTo(models.Group, {
      onDelete: 'CASCADE',
      foreignKey: 'groupId'
    });
  };
  return Message;
};
