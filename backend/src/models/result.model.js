import mongoose from "mongoose";

const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  name: String,
  marks: Number
}, { _id: false });

const resultSchema = new Schema({
  name: { type: String, required: true },
  usn: { type: String, required: true, unique: true },
  subjects: [subjectSchema],
  student_qr: { type: String}
});


const SubjectSchema = new mongoose.Schema({
    subjectCode: { type: String, required: true },
    subjectName: { type: String, required: true },
    credits: { type: Number, required: true },
    obtainedMarks: { type: Number, required: true },
    totalMarks: { type: Number, required: true },
    grade: { type: String } 
}, { _id: false }); 

const ResultSchema = new mongoose.Schema({
    student: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Student', 
        required: true 
    },
    semester: { type: Number, required: true },
    sgpa: { type: Number, default: 0 }, 
    subjects: [SubjectSchema], 
    isBacklog: { type: Boolean, default: false }
}, { timestamps: true });

ResultSchema.index({ student: 1, semester: 1 }, { unique: true });

const Result = mongoose.model('Result', ResultSchema);

export default Result;
