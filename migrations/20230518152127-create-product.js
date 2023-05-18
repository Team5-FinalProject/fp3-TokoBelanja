'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Title cannot be empty"
          }
        }
      },
      price: {
        type: Sequelize.BIGINT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Price cannot be empty"
          },
          isInt: true,
          min: 0,
          max: 50000000
        }
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Stock cannot be empty"
          },
          isInt: true,
          min: 5
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};