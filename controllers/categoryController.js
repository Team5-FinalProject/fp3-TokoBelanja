const { Category, Product } = require("../models");

class CategoryController {
  static async createCategory(req, res) {
    const { type } = req.body;
    try {
      let sold_product_amount;
      const category = await Category.create({
        type,
        sold_product_amount,
      });

      if (category) {
        return res.status(201).json({
          category: {
            id: category.id,
            type: category.type,
            updatedAt: category.updatedAt,
            createdAt: category.createdAt,
            sold_product_amount: category.sold_product_amount,
          },
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(401).json(err);
    }
  }

  static async getAllCategories(req, res) {
    try {
      const categories = await Category.findAll({ include: Product });
      if (categories) {
        res.status(200).json({ categories });
      }
    } catch (err) {
      console.log(err);
      return res.status(401).json(err);
    }
  }

  static async updateCategory(req, res) {
    try {
      const { type } = req.body;
      const categoriesId = req.params.id;

      const updatedCategories = await Category.update(
        { type },
        {
          where: {
            id: categoriesId,
          },
          returning: true,
        }
      );
      if (updatedCategories) {
        return res.status(200).json({
          category: {
            id: updatedCategories[1][0].id,
            type: updatedCategories[1][0].type,
            sold_product_amount: updatedCategories[1][0].sold_product_amount,
            createdAt: updatedCategories[1][0].createdAt,
            updatedAt: updatedCategories[1][0].updatedAt,
          },
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(401).json(err);
    }
  }

  static async deleteCategory(req, res) {
    try {
      const categoriesId = req.params.id;
      const deletedCategories = await Category.destroy({
        where: { id: categoriesId },
      });

      if (deletedCategories) {
        return res.status(200).json({
          message: "Category has been successfully deleted",
        });
      } else {
        return res.status(401).json({
          Error: "Data Not Found!",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(401).json(err);
    }
  }
}

module.exports = CategoryController;
