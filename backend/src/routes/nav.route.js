import navController from "../controllers/nav.controller.js"
import express from "express"
import authenticateToken from "../middleware.js"

const router=express.Router()

router.route('/home')
    .get(navController.renderHome)


router.route('/academic')
    .get(navController.renderAcademic)

router.route('/result')
    .get(authenticateToken, navController.renderResult)

router.route('/about')
    .get(navController.renderAbout)

export default router;