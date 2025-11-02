// backend/routes/examineeRoutes.js
import express from "express";
import { spawn } from "child_process";
// import examinee from "../models/examinee_Model.js";
import path from "path";
import fs from "fs";
import Questions from "../models/QuestionModel.js";
import {
  getquestion,
  getquestions,
} from "../controllers/questionscontroller.js";

const router = express.Router();

// ✅ EXPORT examinee DATA TO EXCEL
router.get("/export", async (req, res) => {
  const examinees = await Questions.find({});
  const python = spawn("python", [
    "./python_scripts/export_questions.py",
    JSON.stringify(examinees),
  ]);

  python.on("close", () => {
    const filePath = path.resolve("python_scripts/output_questions.xlsx");
    res.download(filePath, "questions.xlsx", (err) => {
      if (err) console.error(err);
    });
  });
});

router.post(
  "/import",
  express.raw({
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    limit: "20mb",
  }),
  async (req, res) => {
    try {
      const filePath = path.resolve("python_scripts/input_questions.xlsx");

      // Write the received Excel file buffer correctly
      fs.writeFileSync(filePath, Buffer.from(req.body));

      // Run Python to parse it
      const python = spawn("python", ["./python_scripts/import_questions.py"]);

      let output = "";
      python.stdout.on("data", (data) => (output += data.toString()));

      python.on("close", async () => {
        try {
          const parsed = JSON.parse(output);
          console.log(parsed);
          // if(parsed.reg_no)
          if (!Array.isArray(parsed)) throw new Error("Invalid Excel content");
          await Questions.insertMany(parsed);
          res.json({ message: "Questions imported successfully!" });
        } catch (err) {
          console.error("Parsing error:", err.message);
          res.status(500).json({ error: "Invalid Excel format or empty file" });
        }
      });
    } catch (err) {
      console.error("Server error:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

router.get("/getall", getquestions);
router.get("/:getall", getquestion);
// router.post("/login", login);
// router.get("/students", getSTU);
// router.get("/logout", logout);

export default router;
