import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  coursename: { type: String, required: true },
  course_program: { type: String, required: true },
  exam_title: { type: String, required: true }, // duration in hours
  exam_duration: { type: Number, required: true },
  exam_Qs_limit: { type: Number, required: true },
});
const Course = mongoose.model("Course", courseSchema);
export default Course;
