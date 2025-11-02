import db from "../config/conn.js";
import AnswerModel from "../models/AnswerModel.js";

const submit = async (req, res) => {
  const { reg_no, name, class_name, department, course_exam, score } = req.body;
  //   console.log(reg_no, name, class_name, department, course_exam, score);
  try {
    const data = await AnswerModel.create({
      reg_no,
      name,
      class_name,
      department,
      course_exam,
      score,
    });
    // console.log(result);
    return res.status(200).json({ message: "Exam Submitted Successfully.." });
  } catch (err) {
    return res.status(400).json({ error: "Error in Submitting result!" });
  }
};

const results = async (req, res) => {
  try {
    const result = await AnswerModel.find({});
    return res.status(200).json({ result });
  } catch (err) {
    return res.status(400).json({ error: "Error in fetching result!" });
  }
};

const deleteresults = async (req, res) => {
  try {
    const del = await AnswerModel.deleteMany({});
    return res
      .status(200)
      .json({ message: "All Results Deleted Successfully" });
  } catch (err) {
    return res.status(400).json({ error: "Error in fetching result!" });
  }
};

const deleteindresults = async (req, res) => {
  try {
    const { id } = req.params;
    const del = await AnswerModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Result Deleted Successfully" });
  } catch (err) {
    return res.status(400).json({ error: "Error in fetching result!" });
  }
};

export { submit, results, deleteresults, deleteindresults };
