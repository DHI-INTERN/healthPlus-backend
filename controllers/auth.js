const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
const { json } = require("express");

//User array, later to be relaced by mongodb data
const User = [
  {
    name: "John",
    email: "john@gmail.com",
    username: "jhon",
    password: "12345",
    role: 0,
  },
  {
    name: "admin",
    email: "admin@gmail.com",
    username: "admin",
    password: "12345",
    role: 1,
  },
];

// Sign in
exports.signin = (req, res) => {
  //   console.log(req.body);
  const { username, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const checker = (loggedUser) => {
    if (loggedUser.username == username) {
      return loggedUser;
    }
  };
  const user = User.filter(checker);
  if (!user[0]) {
    return res.status(401).json({
      error: "Username not found",
    });
  }

  if (user[0].password == password) {
    //Create token
    const secret = process.env.SECRET || "shhh";
    const token = jwt.sign({ _id: user._id }, secret);

    // Putting token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    // sending response to frontend
    return res.json({ token, user: user });
  } else {
    return res.status(401).json({
      error: "Username and password does not match",
    });
  }
};

// Unsign the user
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "user logged out successfully",
  });
};
