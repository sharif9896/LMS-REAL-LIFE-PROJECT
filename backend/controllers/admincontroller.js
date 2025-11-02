// authController.js
// const db = require('./db');
// const bcrypt = require('bcrypt');
import bcrypt from "bcrypt";
import Admin from "../models/AdminModels.js";

// SIGNUP
const signup = async (req, res) => {
  const { username, password } = req.body;
  // console.log(username, password);
  try {
    // const adminexist = await Admin.find({ username });
    // if (adminexist) {
    //   return res.status(400).json({ error: "User is already Exists" });
    // }
    //  // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into DB
    const result = await Admin.create({
      username,
      password: hashedPassword,
    });

    // console.log("Signup result:", result);
    return res
      .status(200)
      .json({ success: true, message: "Signed up successfully!" });
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, error: "Error in signup: " + e.message });
  }
};

// LOGIN
const login = async (req, res) => {
  const { username, password } = req.body;
  // console.log(username, password);
  try {
    // Fetch user
    const rows = await Admin.find({ username });

    if (rows.length === 0) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid username or password" });
    }

    const user = rows[0];

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid username or password" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Login successful!", user });
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, error: "Error in login: " + e.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({ message: "Logout Sucessfully.." });
  } catch (e) {
    return res.status(500).json({ error: "Error in logout!" });
  }
};

export { signup, login, logout };
