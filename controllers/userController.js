const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class UserController {
  static async register(req, res) {
    const { email, full_name, username, password, gender, role, balance } = req.body;
    User.create({
      email,
      full_name,
      username,
      password,
      gender,
      role,
      balance
    })
      .then((user) => {
        res.status(201).json({
          "user": {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "gender": user.gender,
            "balance": user.balance,
            "createdAt": user.createdAt
          }
        });
      })
      .catch((err) => {
        res.status(500).json({ message: err.errors[0].message });
      });
  }

  static async login(req, res) {
    const { email, password } = req.body;
    User.findOne({
      where: {
        email
      }
    })
      .then((user) => {
        if (!user) {
          throw {
            name: "User Login Error",
            devMassage: `User with email ${email} not found`
          }
        }
        const isCorrect = comparePassword(password, user.password);
        if (!isCorrect) {
          throw {
            name: "User Login Error",
            devMassage: `User's password with email ${email} doesn't match`
          }
        }
        let payload = {
          id: user.id,
          role: user.role
        }
        const token = generateToken(payload);
        return res.status(200).json(token)
      })
      .catch((err) => {
        res.status(401).json({ message: "Invalid email/password" });
      });
  }

  static async updateUserByToken(req, res) {
    let id = res.locals.user.id;
    const { email, full_name } = req.body;
    let updateData = {
      email,
      full_name
    }
    User.update(updateData, {
      where: {
        id
      },
      returning: true
    })
      .then((user) => {
        res.status(200).json({
          "user": {
            "id": user[1][0].id,
            "full_name": user[1][0].full_name,
            "email": user[1][0].email,
            "createdAt": user[1][0].createdAt,
            "updatedAt": user[1][0].updatedAt
          }
        });
      })
      .catch((err) => {
        res.status(500).json({ message: err.errors[0].message });
      })
  }

  static async deleteUserByToken(req, res) {
    let id = res.locals.user.id;
    User.destroy({
      where: {
        id
      }
    })
      .then((user) => {
        res.status(200).json({ message: "Your account been successfuly deleted" });
      })
      .catch((err) => {
        res.status(500).json({ message: err.errors[0].message });
      })
  }

  static async addBalance(req, res) {
    let id = res.locals.user.id;
    let balance = res.locals.user.balance;
    let addBalance = req.body.balance;
    let updateBalance = balance + addBalance;
    User.update({ balance: updateBalance }, {
      where: {
        id
      },
      returning: true
    })
      .then((user) => {
        res.status(200).json({ message: "Your balance has been successfuly added to Rp." + updateBalance });
      })
      .catch((err) => {
        res.status(500).json({ message: err.errors[0].message });
      })
  }

}

module.exports = UserController;
