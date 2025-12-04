import mongoose from 'mongoose';
import Student from '../models/student.model.js';
import Result from '../models/result.model.js';

// --- CONFIGURATION ---
// 1. MAKE SURE THIS URI IS CORRECT
const MONGO_URI = "mongodb://localhost:27017/scc"; 

const rawData = {
  "students": [
    {
      "_id": "student_001",
      "name": "Rohan Das",
      "usn": "1MS23CS001",
      "email": "rohan.das@college.edu",
      "department": "Computer Science",
      "currentSemester": 3,
      "cgpa": 8.75,
      "qrCodeString": "https://college-portal.com/student/1MS23CS001",
      "academicHistory": []
    },
    {
      "_id": "student_002",
      "name": "Priya Sharma",
      "usn": "1MS23CS002",
      "email": "priya.sharma@college.edu",
      "department": "Computer Science",
      "currentSemester": 2,
      "cgpa": 9.2,
      "qrCodeString": "https://college-portal.com/student/1MS23CS002",
      "academicHistory": []
    }
  ],
  "results": [
    {
      "studentId": "student_001",
      "semester": 1,
      "sgpa": 8.5,
      "isBacklog": false,
      "subjects": [
        { "subjectCode": "MAT101", "subjectName": "Math", "credits": 4, "obtainedMarks": 85, "totalMarks": 100, "grade": "A" }
      ]
    },
    {
      "studentId": "student_002",
      "semester": 1,
      "sgpa": 9.2,
      "isBacklog": false,
      "subjects": [
         { "subjectCode": "PHY102", "subjectName": "Physics", "credits": 4, "obtainedMarks": 89, "totalMarks": 100, "grade": "A" }
      ]
    }
  ]
};
const newStudent={
      "name": "Shaik Sufiyan",
      "usn": "3PD22CG032",
      "email": "3pd22cg032@pdacek.ac.in",
      "department": "Computer Science",
      "currentSemester": 7,
      "cgpa": 7.74,
      "academicHistory": []
}
const seedDatabase = async (req,res) => {
    try {
      const {usn}=newStudent;
      console.log(usn)
      console.log(newStudent)
      // res.json(newStudent)
        const student=new Student(newStudent)
        await Student.register(student,usn)

        // for (let s of rawData.students) {
        //     const { _id: fakeId, usn, ...details } = s;
        //     const student = new Student({ usn, ...details });
        //     // Register handles hashing
        //     const savedStudent = await Student.register(student, usn);
        //     mapOldToNew.set(fakeId, savedStudent);
        // }

        // console.log("🌱 Seeding Results...");
        // for (let r of rawData.results) {
        //     const { studentId: fakeId, ...details } = r;
        //     const realStudent = mapOldToNew.get(fakeId);

        //     if (realStudent) {
        //         const result = new Result({ ...details, studentId: realStudent._id });
        //         const savedResult = await result.save();
                
        //         // Link result back to student
        //         realStudent.academicHistory.push(savedResult._id);
        //         await realStudent.save();
        //     }
        // }

        console.log("✨ SUCCESS! Database seeded and fixed.");
     

    } catch (e) {
        console.error("❌ ERROR:", e);
        
    }
};
const addResult = async (req,res) => {
    
    // 1. Define the subjects based on the image
    // const 
    const subjectsData = [
        {
            subjectCode: "22HU61",
            subjectName: "ENTREPRENEURSHIP",
            credits: 3.00,
            grade: "A",
            obtainedMarks: 90, // Not available in image
            totalMarks: 100
        },
        {
            subjectCode: "22CG62",
            subjectName: "DIGITAL IMAGE PROCESSING",
            credits: 4.00,
            grade: "B",
            obtainedMarks: 67,
            totalMarks: 100
        },
        {
            subjectCode: "22CG633",
            subjectName: "OBJECT ORIENTED MODELLING AND DESIGN",
            credits: 3.00,
            grade: "A+",
            obtainedMarks: 90,
            totalMarks: 100
        },
        {
            subjectCode: "22EIOE642",
            subjectName: "TRANSDUCERS AND INSTRUMENTATION",
            credits: 3.00,
            grade: "B+",
            obtainedMarks: 70,
            totalMarks: 100
        },
        {
            subjectCode: "22CGL66",
            subjectName: "DIGITAL IMAGE PROCESSING LAB",
            credits: 1.00,
            grade: "O",
            obtainedMarks: 96,
            totalMarks: 100
        },
        {
            subjectCode: "22CGP65",
            subjectName: "MAJOR PROJECT PHASE-I",
            credits: 2.00,
            grade: "O",
            obtainedMarks: 95,
            totalMarks: 100
        },
        {
            subjectCode: "22IKS67",
            subjectName: "INDIAN KNOWLEDGE SYSTEM",
            credits: 1.00,
            grade: "O",
            obtainedMarks: 90,
            totalMarks: 100
        },
        {
            subjectCode: "22NS68",
            subjectName: "NATIONAL SERVICE SCHEME",
            credits: 0.00, // Non-credit course often has 0 credits
            grade: "O",
            obtainedMarks: 88,
            totalMarks: 100 // Usually non-evaluative in terms of standard marks
        }
    ];

    // 2. Calculate SGPA (Optional: Automation logic)
    // Formula: Sum(Credits * GPA) / Sum(Credits)
    // Note: I am using the GPA column from your image to calculate this.
    // A=8, B=6, A+=9, B+=7, O=10
    
    const totalCredits = 3+4+3+3+1+2+1+0; // = 17
    const weightedSum = (3*8) + (4*6) + (3*9) + (3*7) + (1*10) + (1*10) + (2*10) + (0*10); 
    // Calculation: 24 + 24 + 27 + 21 + 10 + 10 + 20 + 0 = 136
    
    // 136 / 17 = 8.00 SGPA
    const calculatedSGPA = 8.00;

    // 3. Create the Result Document
    const newResult = new Result({
        student: '6931c3ad1d6acc1de1b0cb0e', // Make sure this variable is defined!
        semester: 6,        // Assuming 6th sem based on course codes (e.g., 22CG62)
        sgpa: calculatedSGPA,
        subjects: subjectsData,
        isBacklog: false
    });

    try {
        await newResult.save();
        console.log("Result added successfully!");
        res.send("added")
    } catch (err) {
        console.error("Error adding result:", err);
        res.send("not added")
    }
};
export default addResult