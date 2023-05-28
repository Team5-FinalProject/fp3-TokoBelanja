const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

function authenticationCategory(req, res, next) {
  try {
    const token = req.get("token");
    const userDecoded = verifyToken(token);
    User.findOne({
      where: {
        id: userDecoded.id,
        role: userDecoded.role,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(401).json({
            name: "Authentication Error",
            devMassage: `User with id ${userDecoded.id} not found`,
          });
        }
        if (user.role !== "admin") {
          return res.status(401).json({
            name: "Authentication Error",
            devMassage: `User with id ${userDecoded.id} not authorized`,
          });
        }
        res.locals.user = user;
        return next();
      })
      .catch((err) => {
        return res.status(500).json({
          name: "Authentication Error",
          devMassage: err,
        });
      });
  } catch (err) {
    return res.status(401).json(err);
  }
}

module.exports = authenticationCategory;
