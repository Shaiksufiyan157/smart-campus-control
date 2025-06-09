import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';

const Schema = mongoose.Schema

const studentSchema = new Schema({

    USN: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10,
        uppercase: true
    }, email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10,
    },
    semester: {
        type: Number,
        required: true
    },
    branch: {
        type: String,
        required: true,
    },
    currentCGPA: {
        type: Number,
        required: true,
    },
    MotherName: {
        type: String,
        required: true
    },
    FatherName: {
        type: String,
        required: true
    }
},

    { timestamps: true }
)

studentSchema.plugin(passportLocalMongoose);
const Student = mongoose.model('Student', studentSchema)


export default Student;