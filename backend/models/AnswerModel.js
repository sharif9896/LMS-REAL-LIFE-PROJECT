import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  reg_no: { type: String, required: true },
  name: { type: String, required: true },
  class_name: { type: String, required: true },
  department: { type: String, required: true },
  course_exam: { type: String, required: true },
  score: { type: String, required: true },
});
const AnswerModel = mongoose.model("Answer", answerSchema);
export default AnswerModel;

// reg_no, name, class_name, department, course_exam, score;
