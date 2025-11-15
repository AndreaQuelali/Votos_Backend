'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * Ejecuta la migración (creación de la tabla).
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   */
  async up(queryInterface, Sequelize) {
    const PostStatusValues = ['ACTIVE', 'DRAFT', 'ARCHIVED']; 

    await queryInterface.createTable('posts', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT, 
        allowNull: false,
      },
      user_id: { 
        type: Sequelize.UUID, 
        allowNull: false,
        references: {
          model: 'users', 
          key: 'id' 
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE', 
      },
      total_votes: { 
        type: Sequelize.INTEGER,
        allowNull: true, 
        defaultValue: 0,
      },
      status: {
        type: Sequelize.ENUM(...PostStatusValues),
        allowNull: false,
        defaultValue: 'ACTIVE', 
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'createdAt' 
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updatedAt' 
      }
    });

    await queryInterface.addIndex('posts', ['user_id'], {
      name: 'idx_posts_user_id'
    });

    await queryInterface.addIndex('posts', ['status'], {
      name: 'idx_posts_status'
    });

    await queryInterface.addIndex('posts', ['createdAt'], {
      name: 'idx_posts_created_at'
    });
    await queryInterface.addIndex('posts', ['total_votes'], {
      name: 'idx_posts_total_votes'
    });
  },

  /**
   * Deshace la migración (elimina la tabla).
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   */
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('posts');
  }
};