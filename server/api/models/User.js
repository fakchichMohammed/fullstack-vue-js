const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")

// user model by mongoose
const userSchema = mongoose.Schema({
  name: { type: String, required: [true, "Please include your name"] },
  email: { type: String, required: [true, "Please include your email"], unique: true },
  password: { type: String, required: [true, "Please include your password"] }
});
userSchema.plugin(uniqueValidator)

module.exports = mongoose.model("User", userSchema)
