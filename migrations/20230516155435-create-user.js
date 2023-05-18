'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Full name cannot be empty",
          },
        }
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Email cannot be empty",
          },
          isEmail: {
            msg: "Invalid email format",
          }
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [6, 10],
          notEmpty: {
            msg: "Password cannot be empty"
          }
        }
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['male', 'female']],
          notEmpty: {
            msg: "Gender cannot be empty"
          }
        }
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['admin', 'customer']],
          notEmpty: {
            msg: "Role cannot be empty"
          }
        }
      },
      balance: {
        type: Sequelize.BIGINT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Balance cannot be empty"
          },
          isInt: {
            msg: "Balance must be a number"
          },
          min: 0,
          max: 1000000000
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
    await queryInterface.dropTable('Users');
  }
};