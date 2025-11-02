// backend/routes/courseRoutes.js
import express from "express";
import { spawn } from "child_process";
import Course from "../models/course_Model.js";
import path from "path";
import fs from "fs";
import { getCOU } from "../controllers/course_examcontroller.js";

const router = express.Router();

// ✅ EXPORT COURSE DATA TO EXCEL
router.get("/export", async (req, res) => {
  const courses = await Course.find({});
  const python = spawn("python", [
    "./python_scripts/excel_export.py",
    JSON.stringify(courses),
  ]);

  python.on("close", () => {
    const filePath = path.resolve("python_scripts/output_courses.xlsx");
    res.download(filePath, "courses.xlsx", (err) => {
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
      const filePath = path.resolve("python_scripts/input_courses.xlsx");

      // Write the received Excel file buffer correctly
      fs.writeFileSync(filePath, Buffer.from(req.body));

      // Run Python to parse it
      const python = spawn("python", ["./python_scripts/excel_import.py"]);

      let output = "";
      python.stdout.on("data", (data) => (output += data.toString()));

      python.on("close", async () => {
        try {
          const parsed = JSON.parse(output);
          if (!Array.isArray(parsed)) throw new Error("Invalid Excel content");
          await Course.insertMany(parsed);
          res.json({ message: "Courses imported successfully!" });
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

router.get("/courses", getCOU);

export default router;
