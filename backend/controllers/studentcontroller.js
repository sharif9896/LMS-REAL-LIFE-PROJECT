import db from "../config/conn.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config.js";
import examinee_tbl from "../models/examinee_tbl.js";

// LOGIN
const login = async (req, res) => {
  const { reg_no, dob } = req.body;
  // console.log(reg_no, dob);
  // console.log(username, password);
  try {
    // Fetch user
    const rows = await examinee_tbl.findOne({ reg_no });
    if (!rows) {
      return res.status(400).json({ message: "Student does'nt exists!" });
    }

    const user = rows;
    // Normalize input DOB from frontend
    const inputDob = new Date(dob).toISOString().split("T")[0]; // YYYY-MM-DD

    // Normalize stored DOB (remove time part)
    const storedDob = user.dob.split(" ")[0]; // "2005-07-05 0:0:0" => "2005-07-05"

    // console.log("Input DOB:", inputDob);
    // console.log("Stored DOB:", storedDob);

    if (inputDob !== storedDob) {
      return res
        .status(400)
        .json({ message: "Invalid credentials! DOB does not match." });
    }

    // console.log(user);
    const token = jwt.sign(
      {
        reg_no: user.reg_no,
      },
      config.JWT_USERPASSWORD,
      { expiresIn: "1d" }
    );

    return res
      .status(200)
      .json({ success: true, message: "Login successful!", user, token });
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, error: "Error in login: " + e.message });
  }
};


const getSTU = async (req, res) => {
  try {
    const students = await examinee_tbl.find({});
    return res.status(200).json({ students });
  } catch (er) {
    return res.status(500).json({ error: "Error in Getting Students!" });
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

export {  login, logout, getSTU };
