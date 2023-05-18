const router = require("express").Router();
const userRouters = require("./userRouters");

router.use("/users", userRouters);

module.exports = router;