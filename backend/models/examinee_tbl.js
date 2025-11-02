import mongoose from "mongoose";

const examinee_tblSchema = new mongoose.Schema({
  reg_no: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  class: { type: String, required: true }, //	 duration in hours
  department: { type: String, required: true },
  dob: { type: String, required: true },
  course_exam: { type: String, required: true },
});

const examinee_tbl = mongoose.model("examinee_tbl", examinee_tblSchema);
export default examinee_tbl;

// examinee_tblSchema.pre("save", function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

// created_at: { type: Date, default: Date.now },
// updated_at: { type: Date, default: Date.now },
// // Pre-findOneAndUpdate middleware to update `updatedAt`
// examinee_tblSchema.pre("findOneAndUpdate", function (next) {
//   this.set({ updatedAt: Date.now() });
//   next();
// });
