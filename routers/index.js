const router = require("express").Router();
const userRouters = require("./userRouters");
const categoryRouters = require("./categoryRouters");

router.use("/users", userRouters);
router.use("/categories", categoryRouters);

module.exports = router;
