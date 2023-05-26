const router = require("express").Router();
const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const authentication = require("../middlewares/authentication");

router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);
router.post("/", createCategory);
router.get("/", getAllCategories);

module.exports = router;
