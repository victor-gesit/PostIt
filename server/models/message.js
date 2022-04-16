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
          msg: 'Name of sender must have one or more characters'
        }
      }
    },
    senderId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    priority: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isIn: {
          args: [['normal', 'urgent', 'critical']],
          msg: 'Message priority is either normal, urgent or critical'
        }
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [1, 100000],
          msg: 'Body of message must have one or more characters'
        }
      }
    },
    isComment: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });
  Message.associate = (models) => {
    Message.belongsTo(models.Group, {
      onDelete: 'CASCADE',
      foreignKey: 'groupId'
    });
    Message.belongsToMany(models.User, {
      through: 'MessageRead'
    });
  };
  return Message;
};
