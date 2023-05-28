const { TransactionHistory, Product } = require("../models");

class TransactionHistoryController {
  static async createTransactionHistory(req, res) {}

  static async getAllTransactionHistoryUsers(req, res) {
    try {
      const transactions = await TransactionHistory.findAll({
        include: Product,
      });
      if (transactions) {
        res.status(200).json({ transactions });
      }
    } catch (err) {
      console.log(err);
      return res.status(401).json(err);
    }
  }

  static async getAllTransactionHistoryAdmins(req, res) {}

  static async getTransactionHistoryById(req, res) {}
}

module.exports = TransactionHistoryController;
