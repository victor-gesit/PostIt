'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      sentBy: {
        type: Sequelize.STRING
      },
      body: {
        type: Sequelize.TEXT
      },
      groupId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Groups',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Messages');
  }
};
