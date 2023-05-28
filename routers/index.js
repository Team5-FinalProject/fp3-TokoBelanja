const router = require("express").Router();
const userRouters = require("./userRouters");
const categoryRouters = require("./categoryRouters");
const productRouters = require("./productRouters");
const transactionHistoryRouters = require("./transactionHistoryRouters");

router.use("/users", userRouters);
router.use("/categories", categoryRouters);
router.use("/products", productRouters);
router.use("/transactions", transactionHistoryRouters);

module.exports = router;
