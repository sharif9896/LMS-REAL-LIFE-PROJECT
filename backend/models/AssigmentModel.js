import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  ClassNames: { type: String, required: true },
  department: { type: String, required: true },
  file_path: { type: String, required: true },
  name: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const AssignmentModel = mongoose.model("Assignment", assignmentSchema);
export default AssignmentModel;
