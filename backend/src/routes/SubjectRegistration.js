import express from "express"
import SubjectsData from "../seed/subjectData.js"
import Subject from "../models/subject.model.js"
import User from "../models/user.model.js"
import Student from "../models/student.model.js"

const cources = [
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
const route = express.Router()

route.get('/my-subs',async(req,res)=>{
// C:\Users\shaik\Desktop\smart campus control\backend\src\views\RegisteredSubjects.ejs
  // const user=req.user
  const user=await Student.findById(req.user.id).populate('registeredSubjects')
  // res.json(user)
   const CoreSubjects = await user.registeredSubjects.filter(sub => sub.category === "CORE");
  const OpenElective = await user.registeredSubjects.find(sub => sub.category === "OPEN_ELECTIVE");
  const ProfessionElective = await user.registeredSubjects.find(sub => sub.category === "PROFESSIONAL_ELECTIVE");
  // res.json({CoreSubjects,OpenElective,ProfessionElective})
  res.render("RegisteredSubjects.ejs",{CoreSubjects,OpenElective,ProfessionElective})


})

route.get('/subject-registration', async (req, res) => {
   try {
      // Example: SubjectsData is available and contains subject objects
      const CoreSubjects = await Subject.find({ category: "CORE" });
  const OpenElectives = await Subject.find({ category: 'OPEN_ELECTIVE' })
  const ProfessionElectives = await Subject.find({ category: 'PROFESSIONAL_ELECTIVE' })

  res.render('SubjectRegistration.ejs', { CoreSubjects, OpenElectives, ProfessionElectives });
      
      console.log('Subjects saved successfully');
  } catch (err) {
      console.error('Error saving subjects:', err);
      res.status(500).send('Failed to save subjects');
  }

})

route.post('/subject-registration', async (req, res) => {
 try{
   const { professional, open } = req.body;
  const CoreSubjects = await Subject.find({ category: "CORE" });
  const OpenElective = await Subject.findOne({ code: open })
  const ProfessionElective = await Subject.findOne({ code: professional })
  const {_id}=req.user;
 
  const user = await Student.findById(_id); 
  // res.json(user)
  user.registeredSubjects = CoreSubjects.map(subject => subject._id);

if (OpenElective) user.registeredSubjects.push(OpenElective._id);
if (ProfessionElective) user.registeredSubjects.push(ProfessionElective._id);
await user.save()
if (user.registeredSubjects && user.registeredSubjects.length > 0) {
  req.session.isRegistered = true;
} else {
  req.session.isRegistered = false;
}
req.flash('success','Subjects registered successfully!');
 }
 catch(e){
  req.flash('error','Failed to register subjects. Please try again.');
 }
res.redirect('/home')
})


export default route;