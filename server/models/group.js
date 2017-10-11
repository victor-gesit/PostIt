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
          msg: 'Creator name must have one or more characters'
        }
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      unique: {
        args: true,
        msg: 'A group already exists with this title',
      },
      validate: {
        len: {
          args: [1, 1000],
          msg: 'Title of group must have one or more characters',
          notEmpty: true
        },
      }
    },
    creatorEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '',
      validate: {
        len: {
          args: [4, 1000],
          msg: 'Description of group must have four or more characters'
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
      onDelete: 'CASCADE'
    });
  };
  return Group;
};
