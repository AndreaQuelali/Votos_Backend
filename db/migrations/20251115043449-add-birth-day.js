'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * Ejecuta la migración (añade la columna NOT NULL con valor por defecto).
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   */
  async up(queryInterface, Sequelize) {
    const minimumSqlDate = '1900-01-01'; 
  
    const sql = `
      ALTER TABLE users 
      ADD COLUMN "birthday" DATE NOT NULL DEFAULT '${minimumSqlDate}';
    `;

    await queryInterface.sequelize.query(sql);
  },

  /**
   * Deshace la migración (elimina la columna).
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   */
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE users
      DROP COLUMN "birthday";
    `);
  }
};