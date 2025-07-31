import mongoose from "mongoose";

const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  name: String,
  marks: Number
}, { _id: false });

const resultSchema = new Schema({
  name: { type: String, required: true },
  usn: { type: String, required: true, unique: true },
  subjects: [subjectSchema]
});

const Result = mongoose.model('Result', resultSchema);

export default Result;