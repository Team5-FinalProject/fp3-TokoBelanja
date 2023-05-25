"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Product);
    }
  }
  Category.init(
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Type cannot be empty",
          },
        },
      },
      sold_product_amount: {
        type: DataTypes.BIGINT,
        allowNull: true,
        validate: {
          notEmpty: {
            msg: "Sold product amount cannot be empty",
          },
          isInt: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Category",
      hooks: {
        beforeCreate: (category, options) => {
          category.sold_product_amount = 0;
        },
      },
    }
  );
  return Category;
};
