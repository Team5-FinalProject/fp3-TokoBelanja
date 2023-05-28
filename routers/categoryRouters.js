const router = require("express").Router();
const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const authenticationCategory = require("../middlewares/authenticationCategory");

router.use(authenticationCategory);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);
router.post("/", createCategory);
router.get("/", getAllCategories);

module.exports = router;
