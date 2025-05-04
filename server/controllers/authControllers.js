const User = require("../models/User");

exports.registerUser = async (req, res) => {
  // User needs to be logged out before making a new account
  if (req.session.userId) {
    return res.status(400).send({
      message:
        "Session in progress. User must log out before registering for a new account",
    });
  }

  // Request needs a body
  if (!req.body) {
    return res
      .status(400)
      .send({ message: "Email, username, and password required" });
  }

  // Body needs an email, username, and password
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return res
      .status(400)
      .send({ message: "Email, username, and password required" });
  }

  // Try to create user
  try {
    const user = await User.create(email, username, password);
    // Add the user id to the cookie and send the user data back
    req.session.userId = user.id;
    res.send(user);
  } catch (error) {
    // Handles user submitting a username or email that already exists
    if (error.code === "23505") {
      res.status(400).send({
        message:
          "Unique Constraint Violation: Username and email must be unique",
      });
    } else {
      // All other unidentified errors are also sent to the client
      res.status(400).send({ message: error.message });
    }
  }
};

exports.loginUser = async (req, res) => {
  // User needs to be logged out before logging in with another account
  if (req.session.userId) {
    return res.status(400).send({
      message: "Session in progress. User must log out before logging in",
    });
  }

  // Request needs a body
  if (!req.body) {
    return res.status(400).send({ message: "Username and password required" });
  }

  // Body needs a username and password
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: "Username and password required" });
  }

  // Email must be valid
  const user = await User.findByEmail(email);
  if (!user) {
    return res.status(404).send({ message: "User not found." });
  }

  // Password must match
  const isPasswordValid = await user.isValidPassword(password);
  if (!isPasswordValid) {
    return res.status(401).send({ message: "Invalid credentials." });
  }

  // Add the user id to the cookie and send the user data back
  req.session.userId = user.id;
  res.send(user);
};

exports.showMe = async (req, res) => {
  // no cookie with an id => Not authenticated.
  if (!req.session.userId) {
    return res.status(401).send({ message: "User must be authenticated." });
  }

  // cookie with an id => here's your user info!
  const user = await User.find(req.session.userId);
  res.send(user);
};

exports.logoutUser = (req, res) => {
  req.session = null; // "erase" the cookie
  // Sends status 200 (OK) to let client know logout was sucessful
  res.status(200).send({ message: "User logged out." });
};
