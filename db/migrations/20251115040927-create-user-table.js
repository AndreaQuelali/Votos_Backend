'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * Ejecuta la migración (creación de la tabla).
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   */
  async up(queryInterface, Sequelize) {
    const UserRoleValues = ['USER', 'ADMIN']; 

    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      first_name: {
        type: Sequelize.STRING(50), 
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      phone_number: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      phone_country_code: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, 
      },
      role: {
        type: Sequelize.ENUM(...UserRoleValues),
        allowNull: false,
        defaultValue: 'USER', 
      },
      password: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Opcional: define un default para mejor compatibilidad
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });

   
    await queryInterface.addIndex('users', ['role'], {
      name: 'idx_users_role'
    });
    
    await queryInterface.addIndex('users', ['country'], {
      name: 'idx_users_country'
    });
    
    await queryInterface.addIndex('users', ['city'], {
      name: 'idx_users_city'
    });
  },

  /**
   * Deshace la migración (elimina la tabla).
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   */
  async down(queryInterface, Sequelize) {
   
    await queryInterface.dropTable('users');
    
  }
};