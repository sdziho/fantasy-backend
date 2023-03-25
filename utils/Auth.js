const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");
const User = require("../models/Users");

// Register user
const userRegister = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create new user
    user = new User({ name, email, password });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    res.json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const userLogin = async (req, res) => {
  let { email, password } = req.body;
  // First Check if the username is in the database
  const user = await User.findOne({ email });
  let token = jwt.sign(
    {
      name: user.name,
      user_id: user._id,
    },
    SECRET,
    {
      expiresIn: "7 days",
    }
  );
  if (!user) {
    return res.status(404).json({
      message: "Username is not found. Invalid login credentials.",
      success: false,
    });
  }
  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    // Sign in the token and issue it to the user
    let result = {
      name: user.name,
      token: `Bearer ${token}`,
      user_id: user._id,
    };
    return res.status(200).json({
      ...result,
      message: "You are now logged in.",
      success: true,
    });
  } else {
    return res.status(403).json({
      message: "Incorrect password.",
      success: false,
    });
  }
};

const userAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      const err = {};
      err.message = "Unathorized access";
      err.success = false;

      return res.status(401).json(err); // send the error response to client
    }
    req.user = user;
    return next(); // continue to next middleware if no error.
  })(
    req,
    res,
    next
  ); /* passport.authentication returns a function, we invoke it with normal req..res arguments to override default functionality */
};

const serializeUser = (user) => {
  try {
    return {
      email: user.email,
      name: user.name,
      _id: user._id,
    };
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  userRegister,
  userLogin,
  userAuth,
  serializeUser,
};
