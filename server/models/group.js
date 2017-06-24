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
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
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
