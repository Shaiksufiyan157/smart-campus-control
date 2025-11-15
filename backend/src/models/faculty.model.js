import mongoose from "mongoose";

const Schema = mongoose.Schema;

const qualification=new Schema({
    degree: String,
    institution: String,
    year_of_passing: Number,
    grade: String
});
const FacultySchema = new Schema({ 

    name: {type: String,
    required: true
    },
    email: {type: String,
    required: true,
    unique: true
    },
    department: {type: String,
    required: true
        
    },
    facultyId: {type: String,
        required: true
    },
    qualification: [qualification],
    // experience: {type: Number},
    subjects: [{type: String}],
    achievements: [{type: String}],
    paper_published: [{type: String}],
    qr:String
});

const Faculty = mongoose.model('Faculty', FacultySchema);

export default Faculty;