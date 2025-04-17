const db = require("../config/db");

// GET all data
exports.getAllUsers = (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

// Signup Logic
exports.signup = (req, res) => {
  const { username, email, password } = req.body;

  const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

  db.query(query, [username, email, password], (err, result) => {
    if (err) {
      console.error("Signup Error:", err);
      return res.json({ success: false, message: "Signup failed. Try again." });
    }
    res.json({ success: true, message: "Signup successful! Please login." });
  });
};

// Login Logic
exports.login = (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM users WHERE email = ? AND password = ?`;

  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Login Error:", err);
      return res.json({ success: false, message: "Login failed. Try again." });
    }

    if (results.length > 0) {
      const user = results[0];
      res.json({
        success: true,
        message: "Login successful!",
        id: user.id,
        username: user.username,
      });
    } else {
      res.json({ success: false, message: "Invalid email or password." });
    }
  });
};
