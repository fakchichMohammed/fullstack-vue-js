const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// configure user registration
exports.createUser = (req, res, next) => {
  // hash the password before saving the user model
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash
    });
    // hashing the password ends here

    // save the user credentials
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Invalid authentication credentials!"
        });
      });
  });
  // user saving ends here
};
// register configuration ends here

// configure user login
exports.userLogin = (req, res, next) => {
  let fetchedUser;
  // find the user by its email
  User.findOne({ email: req.body.email })
    .then((user) => {
      // if the user does not exist or the credentials are invalid
      if (!user) {
        return res.status(401).json({
          message: "Authentication failed!"
        });
      }
      // the user is found
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Authentication failed!"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });
};
// login configuration ends here
