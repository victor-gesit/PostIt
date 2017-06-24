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
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
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
