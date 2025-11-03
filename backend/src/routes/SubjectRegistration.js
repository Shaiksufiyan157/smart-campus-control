import express from "express"
import SubjectsData from "../seed/subjectData.js"
import Subject from "../models/subject.model.js"
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

route.get('/subject-registration', async (req, res) => {
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
  // res.json({CoreSubjects:CoreSubjects,
  //   OpenElectives:OpenElectives,
  //   ProfessionElectives:ProfessionElectives
  // })
  const CoreSubjects = await Subject.find({ category: "CORE" });
  const OpenElectives = await Subject.find({ category: 'OPEN_ELECTIVE' })
  const ProfessionElectives = await Subject.find({ category: 'PROFESSIONAL_ELECTIVE' })

  res.render('SubjectRegistration.ejs', { CoreSubjects, OpenElectives, ProfessionElectives });

})

route.post('/subject-registration', async (req, res) => {
  const { professional, open } = req.body;
  const CoreSubjects = await Subject.find({ category: "CORE" });
  const OpenElective = await Subject.find({ code: open })
  const ProfessionElective = await Subject.find({ code: professional })
  const user=req.user;
  console.log(user)
//   user.registeredSubjects = CoreSubjects.map(subject => subject._id);

// if (OpenElective) user.registeredSubjects.push(OpenElective._id);
// if (ProfessionElective) user.registeredSubjects.push(ProfessionElective._id);
// await user.save()
await user.updateOne({ _id: req.user._id }, { $set: { registeredSubjects: [] } });

 console.log(user)
  res.json({
    CoreSubjects: CoreSubjects,
    OpenElective: OpenElective,
    ProfessionElective: ProfessionElective
  })
})


export default route;