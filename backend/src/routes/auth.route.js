import express from "express"
import authController from "../controllers/auth.controllers.js"
import passport from "passport"
import User from "../models/user.model.js"
import { isLoggedIn } from "../middleware.js"
const router = express.Router()

router.route('/admin/register')
    .get(authController.rendersignup)
    .post(authController.registerUser)

router.route('/login')
    .get(authController.renderlogin)
    .post(passport.authenticate('local', { failureRedirect: '/login' }), authController.login)
router.route('/register')
    .get(authController.rendersignup)
    .post(authController.registerUser)

// router.route('/faculty/register')
//     .get(authController.RenderFacultyForm)
//     .post(authController.registerUser)

router.route('/student/register')
    .get(isLoggedIn, authController.RenderStudentForm)
    .post(isLoggedIn, authController.RegisterStudent)

router.route('/logout')
    .post(authController.logout)

export default router;