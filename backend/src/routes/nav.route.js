import navController from "../controllers/nav.controller.js"
import express from "express"
import { isLoggedIn } from "../middleware.js"
import passport from "passport"

const router=express.Router()

router.route('/home')
    .get(navController.renderHome)


router.route('/academic')
    .get(navController.renderAcademic)

router.route('/result')
    .get(isLoggedIn,navController.renderResult)

router.route('/about')
    .get(isLoggedIn,navController.renderAbout)

export default router;