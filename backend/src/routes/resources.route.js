import express from "express"
import resourcecontroller from "../controllers/resources.controllers.js";
import multer from 'multer'
import cloud from '../cloudinary/index.js'

const upload = multer({storage:cloud.storage })
const router=express.Router()



router.get('/pyq',resourcecontroller.renderpyq);
router.get('/notes',resourcecontroller.rendernotes);

router.route('/addnotes')
.get(resourcecontroller.renderAddnotes)
.post(upload.array('notes'),resourcecontroller.Addnotes);
router.route('/addpyqs')
.get(resourcecontroller.renderAddpyqs)
.post(upload.array('pyq'),resourcecontroller.Addpyqs);
export default router;
