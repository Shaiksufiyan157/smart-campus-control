import StudentController from "../controllers/student.controller.js"
import express from "express"
import { isLoggedIn } from "../middleware.js"
import passport from "passport"

const router=express.Router()

router.route('/home')
    .get(StudentController.renderHome)


router.route('/academic')
    .get(StudentController.renderAcademic)

router.route('/about')
    .get(isLoggedIn,StudentController.renderAbout)

export default router;