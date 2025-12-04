import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';

const StudentSchema = new mongoose.Schema({
    // 1. Personal Details
    name: { type: String, required: true, trim: true },
    usn: { 
        type: String, 
    
    }, // University Seat Number / Roll No
    email: { type: String, required: true,},
    phone: { type: String },
    
    // 2. Unique QR Code
    // Store the unique string used to generate the QR, or the Cloudinary URL of the image
    qrCodeString: { type: String, unique: true }, 
    
    // 3. Current Academic Status
    currentSemester: { type: Number, default: 1 },
    department: { type: String, required: true },
    cgpa: { type: Number, default: 0 }, // Cumulative Grade Point Average
    
    // Efficiency: Array of references to Result documents
    // This allows you to populate marks only when needed
    academicHistory: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Result' 
    }]
    , registeredSubjects: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "Subject"
}]

}, { timestamps: true });

// Indexing for search efficiency
StudentSchema.index({ usn: 1 });
StudentSchema.index({ email: 1 });

StudentSchema.plugin(passportLocalMongoose,{usernameField: 'usn'});
const Student = mongoose.model('Student', StudentSchema)


export default Student;