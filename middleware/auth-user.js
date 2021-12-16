const jwt = require("jsonwebtoken");
const httpError = require("./../models/http-error");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return next(new httpError("Authorization failed!", 401));
    }

    const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    return next(new httpError("Error. Authorization failed!. ", 403));
  }
};
