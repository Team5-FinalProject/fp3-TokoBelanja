"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category);
      this.hasMany(models.TransactionHistory);
    }
  }
  Product.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Title cannot be empty",
          },
        },
      },
      price: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Price cannot be empty",
          },
          isInt: true,
          min: 0,
          max: 50000000,
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Stock cannot be empty",
          },
          isInt: true,
          min: 5,
        },
      },
      CategoryId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
