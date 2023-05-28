const router = require("express").Router();
const userRouters = require("./userRouters");
const categoryRouters = require("./categoryRouters");
const productRouters = require("./productRouters");

router.use("/users", userRouters);
router.use("/categories", categoryRouters);
router.use("/products", productRouters);

module.exports = router;
