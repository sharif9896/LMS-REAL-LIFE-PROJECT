import mongoose from "mongoose";
const questionSchema = new mongoose.Schema({
  course_name: { type: String, required: true },
  questions: { type: String, required: true },
  opt1: { type: String, required: true },
  opt2: { type: String, required: true },
  opt3: { type: String, required: true },
  opt4: { type: String, required: true },
  correct_answer: { type: String, required: true },
});

const Questions = mongoose.model("question", questionSchema);
export default Questions;
