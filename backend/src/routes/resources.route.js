import express from "express"
import resourcecontroller from "../controllers/resources.controllers.js";
import multer from 'multer'
import cloud from '../cloudinary/index.js'

const upload = multer({storage:cloud.storage })
const router=express.Router()



router.get('/pyq',resourcecontroller.renderpyq);
router.route('/notes')
.get(resourcecontroller.rendernotes)
.post(resourcecontroller.filter)


export default router;
