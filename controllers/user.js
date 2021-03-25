//Importing required packages & methods
const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.signup = (req, res) => {
  console.log(req);
  console.log(req.body);
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      console.log(err);
      res.json({ err: errorHandler(err) });
    } else {
      user.salt = undefined;
      user.hashed_password = undefined;
      res.json({ user });
    }
  });
};
