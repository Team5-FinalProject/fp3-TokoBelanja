"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TransactionHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
      this.belongsTo(models.Product);
    }
  }
  TransactionHistory.init(
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Quantity cannot be empty",
          },
          isInt: true,
        },
      },
      total_price: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Total price cannot be empty",
          },
          isInt: true,
        },
      },
    },
    {
      sequelize,
      modelName: "TransactionHistory",
    }
  );
  return TransactionHistory;
};
