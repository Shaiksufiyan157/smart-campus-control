import express from "express"
import resourcecontroller from "../controllers/resources.controllers.js";
import multer from 'multer'
import cloud from '../cloudinary/index.js'
import { isLoggedIn } from "../middleware.js";

const upload = multer({storage:cloud.storage })
const router=express.Router()



router.route('/pyqs')
.get(isLoggedIn,resourcecontroller.renderpyq)
.post(resourcecontroller.filter)
router.route('/notes')
.get(isLoggedIn,resourcecontroller.rendernotes)
.post(resourcecontroller.filter)


export default router;
