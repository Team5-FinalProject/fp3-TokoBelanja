'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('TransactionHistories', 'productId', {
      type: Sequelize.INTEGER
    })

    await queryInterface.addConstraint('TransactionHistories', {
      fields: ['productId'],
      type: 'foreign key',
      name: 'product_fk',
      references: {
        table: 'Products',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('TransactionHistories', 'product_fk')
    await queryInterface.removeColumn('TransactionHistories', 'productId')
  }
};
