import StudentController from "../controllers/student.controller.js"
import express from "express"
import middleware from "../middleware.js"
import passport from "passport"
import Student from "../models/student.model.js"
const router=express.Router()

router.route('/home')
    .get(StudentController.renderHome)


router.route('/academic')
    .get(StudentController.renderAcademic)

router.route('/about')
    .get(StudentController.renderAbout)
router.route('/allstudents',(req,res)=>{
    const allstudents=Student.find({})
    res.json(allstudents)
})
router.route('/student/:usn')
.get(StudentController.FindStudent)


export default router;