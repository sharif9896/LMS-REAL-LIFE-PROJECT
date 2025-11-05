import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema({
  ClassNames: { type: String, required: true },
  department: { type: String, required: true },
  file_path: { type: String, required: true },
  name: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const AnnouncementModel = mongoose.model("Announcement", AnnouncementSchema);
export default AnnouncementModel;
