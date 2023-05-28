const router = require("express").Router();
const TransactionHistory = require("../controllers/transactionHistoryController");
const authentication = require("../middlewares/authentication");

router.use(authentication);

router.post("/", TransactionHistory.createTransactionHistory);
router.get("/user", TransactionHistory.getAllTransactionHistoryUsers);
router.get("/admin", TransactionHistory.getAllTransactionHistoryAdmins);
router.get("/:id", TransactionHistory.getTransactionHistoryById);

module.exports = router;
