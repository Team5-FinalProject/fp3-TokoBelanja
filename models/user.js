'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Full name cannot be empty",
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
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
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 10],
        notEmpty: {
          msg: "Password cannot be empty"
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['male', 'female']],
        notEmpty: {
          msg: "Gender cannot be empty"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['admin', 'customer']],
        notEmpty: {
          msg: "Role cannot be empty"
        }
      }
    },
    balance: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Balance cannot be empty"
        },
        isInt: {
          msg: "Balance must be a number"
        },
        min: 0,
        max: 100000000
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPassword(user.password);
      }
    }
  });
  return User;
};