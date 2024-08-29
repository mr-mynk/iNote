const express = require("express");
const User = require("../models/Users");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var fetchUser = require("../middleware/fetchUser");

router.post(
  "/createUser",
  [
    body("name", "Name should be min 3 char.").isLength({ min: 3 }),
    body("email", "Enter a proper email address.").isEmail(),
    body(
      "password",
      "Password should contain atleast one capital letter, one number, one symbol, and min 8 char."
    ).isStrongPassword(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({
            error: "This email alreay exists, Please try to Login.!",
          }
        );
      }
      const hashedValue = await bcrypt
        .hash(req.body.password, 10)
        .then(function (hash) {
          return hash;
        });
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedValue,
      });
      res.json({ User: user });
    } catch (error) {
      console.log("Error:- ", error.message);
      res.status(500).send("Internel Server Error Occured.!");
    }
  }
);

router.post(
  "/userLogin",
  [
    body("email", "User may not exist.!").isEmail(),
    body("password", "Please Enter the correct password.!").isStrongPassword(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials." });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials." });
      }
      const authToken = jwt.sign({ user: { id: user.id } }, "JWT_SECRET");
      // console.log(
      //   "You successfully Logged in,\nHere is your token:-   ",
      //   authToken
      // );
      res.json({ token: authToken });
    } catch (error) {
      console.log("Error:-    ", error.message);
      res.status(500).send("Internel Server Error Occured.!");
    }
  }
);

router.post("/userData", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId)
      .select("password")
      .select("name")
      .select("email")
      .select("date");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error.");
  }
});
module.exports = router;
