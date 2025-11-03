import express from "express"
import SubjectsData from "../seed/subjectData.js"
import Subject from "../models/subject.model.js"
const cources= [
    {
      "courseCode": "22CG72",
      "subjectName": "Web Application Security",
      "credits": 4.0,
      "status": "Registered",
      "type": "Core"
    },
    {
      "courseCode": "22CG73",
      "subjectName": "CLOUD COMPUTING",
      "credits": 4.0,
      "status": "Registered",
      "type": "Core"
    },
    {
      "courseCode": "22CG71",
      "subjectName": "FULL STACK DEVELOPMENT",
      "credits": 4.0,
      "status": "Registered",
      "type": "Core"
    },
    {
      "courseCode": "22CGP76",
      "subjectName": "MAJOR PROJECT II",
      "credits": 6.0,
      "status": "Registered",
      "type": "Core"
    }
]
const route=express.Router()

route.get('/subject-registration',async(req,res)=>{
    //  try {
    //     // Example: SubjectsData is available and contains subject objects
    //     for (const data of SubjectsData) {
    //         const subject = new Subject(data);
    //         await subject.save();
    //     }
    //     
    //     console.log('Subjects saved successfully');
    // } catch (err) {
    //     console.error('Error saving subjects:', err);
    //     res.status(500).send('Failed to save subjects');
    // }
    res.render('SubjectRegistration.ejs');
})

route.post('/subject-registration',(req,res)=>{
    const {courses}=req.body;
    // res.send("working")
    res.status(200).json({courses})
})


export default route;