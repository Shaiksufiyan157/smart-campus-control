import express from "express"
import authController from "../controllers/auth.controllers.js"
import passport from "passport"
import User from "../models/user.model.js"
import middleware from "../middleware.js"
const router = express.Router()
import catchAsync from "../utils/cathAsync.js"

router.route('/admin/register')
    .get(authController.rendersignup)
    .post(authController.registerUser)

router.route('/login')
    .get(authController.renderlogin)
    .post(middleware.storeReturnTo,passport.authenticate('local', { failureFlash:true,failureRedirect: '/login' }), authController.login)
router.route('/register')
    .get(authController.rendersignup)
    .post(authController.registerUser)

router.route('/student/register')
    .get(middleware.isLoggedIn, authController.RenderStudentForm)
    .post(middleware.isLoggedIn, authController.RegisterStudent)

router.route('/logout')
    .get(authController.logout)

export default router;

