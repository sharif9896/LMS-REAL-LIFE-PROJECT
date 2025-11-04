import express from "express";
import "dotenv/config";
import cors from "cors";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
// import userrouter from "./routes/userrouter.js";
import cloudinaryfunc from "./config/cloudinary.js";
import db from "./config/conn.js";
import adminrouter from "./routes/adminroutes.js";
// import examsRouter from "./routes/exams.js";
// import CERouter from "./routes/course_examroutes.js";
// import STURouter from "./routes/studentroutes.js";
// import COURouter from "./routes/course_examroutes.js";
// import QUERouter from "./routes/questionsRoutes.js";
// import resultRouter from "./routes/resultroutes.js";
// import timerouter from "./routes/timesroutes.js";
import multer from "multer";
import mongodb from "./config/conn.js";
// import router from "./routes/courseRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import examineeRoutes from "./routes/examineeRoutes.js";
import timerouter from "./routes/timesroutes.js";
import QUERouter from "./routes/questionroutes.js";
import resultRouter from "./routes/resultroutes.js";
import AssignmentModel from "./models/AssigmentModel.js";
// import adminrouter from "./routes/adminroute.js";
// import foodrouter from "./routes/foodsroute.js";

const app = express();

// APP CONFIG
const PORT = process.env.PORT || 3000;
// if (db) {
//   console.log("DB Connected..");
// } else {
//   console.log("Not Connected!");
// }
cloudinaryfunc();
mongodb();

// MIDDLEWARE
app.use(cors());
app.use(express.json({ limit: "200mb" })); // base64 uploads
app.use(express.urlencoded({ extended: true, limit: "200mb" }));

// API ENDPOINTS

// Multer storage setup for PDF uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed!"));
    }
  },
});

// Upload PDF
app.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    const file = req.file;
    // const { ClassNames, department } = req.body;
    const ClassNames = "II";
    const department = "IIBCA";
    // console.log(req.files, file);
    if (!file) return res.status(400).send("No file uploaded.");
    const getdata = await AssignmentModel.findOne({ file_path: file.path });
    if (getdata) return res.status(400).json({ error: "File already exists!" });
    const newAssignment = new AssignmentModel({
      ClassNames,
      department,
      file_path: file.path,
      name: file.originalname,
    });
    await newAssignment.save();
    return res.status(200).json({ message: "File Uploaded Successfully.." });
  } catch (err) {
    return res.status(401).json({ error: "Error in File Uploading!", err });
  }
});

// Get all PDFs
app.get("/files", async (req, res) => {
  try {
    const fid = await db.query("SELECT * FROM pdf_files");
    if (!fid) return res.status(401).json({ error: "Error in files!" });
    return res.status(200).json(fid);
  } catch (err) {
    return res.status(401).json({ error: "Error in Fetching!", err });
  }
});

// Download PDF by ID
app.get("/download/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await db.query("SELECT * FROM pdf_files WHERE id = ?", [
      id,
    ]);
    if (results.length === 0) return res.status(404).send("File not found.");
    const filePath = results[0].file_path;
    res.download(filePath, results[0].name);
  } catch (err) {
    if (err) return res.status(500).send(err);
  }
});

app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cookieParser());
// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   })
// );

app.use("/api/admin", adminrouter);
app.use("/api/course", courseRoutes);
app.use("/api/examinee", examineeRoutes);
app.use("/api/times", timerouter);
app.use("/api/question", QUERouter);
app.use("/api/user", resultRouter);
// app.use("/api/examinees", STURouter);
// app.use("/api/course", COURouter);
// app.use("/api/exams", examsRouter);
// app.use("/api/entry", STURouter);
// app.use("/api/course", CERouter);
// app.use("/api/quizzes", quizRoutes);
// app.use("/api/answers", answerRoutes);
// app.use('/api/user', userrouter);
// app.use('/api/product', foodrouter);

app.get("/", (req, res) => {
  res.send("API is Running");
});
app.listen(PORT, () => {
  console.log(`Server is Started at Port : localhost:${PORT}`);
});
