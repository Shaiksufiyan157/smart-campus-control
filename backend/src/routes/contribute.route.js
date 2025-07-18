import express from "express"
import contributeController from "../controllers/contribute.controller.js"
import multer from 'multer'
import cloud from '../cloudinary/index.js'

const upload = multer({storage:cloud.storage })
const router=express.Router()


router.route('/addnotes')
.get(contributeController.renderAddnotes)
.post(upload.single('notes'),contributeController.Addnotes);
router.route('/addpyqs')
.get(contributeController.renderAddpyqs)
.post(upload.single('pyq'),contributeController.Addpyqs);

export default router;