import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  code: String,              // e.g., "CSE301"
  name: String,              // e.g., "Operating Systems"
  department: String,        // e.g., "CSE"
  semester: Number,          // e.g., 5
  category: {                // Type of subject
    type: String,
    enum: ["CORE", "PROFESSIONAL_ELECTIVE", "OPEN_ELECTIVE"],
    required: true
  },
  credits:Number
});

const Subject= mongoose.model("Subject", subjectSchema);
export default Subject;