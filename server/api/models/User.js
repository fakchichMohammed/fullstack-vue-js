const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// user model by mongoose
const userSchema = mongoose.Schema({
  name: { type: String, required: [true, "Please include your name"] },
  email: {
    type: String,
    required: [true, "Please include your email"],
    unique: true
  },
  password: { type: String, required: [true, "Please include your password"] },/* 
  tokens: [{ token: { type: String, required: true } }] */
});
userSchema.plugin(uniqueValidator);
/* 
// this will hash the password before saving the user model
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});
// hashing the password ends here

// this will generate an auth token for the user
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id, email: user.email, name: user.name },
    "secret"
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
// token generation ands here

// this will search for a user by email and password
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error({
      message: "Authentication failed - no user found!"
    });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error({
      message: "Authentication failed - password is incorrect!"
    });
  }
  return user;
};
// user search ends here */

module.exports = mongoose.model("User", userSchema);
