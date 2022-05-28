const express = require("express");
const UserController = require("../controllers/userController");
const router = express.Router();

router.post("user/signup", UserController.createUser);
router.post("user/login", UserController.userLogin);
// router.get("/me", UserController.getUserDetails)

module.exports = router;
