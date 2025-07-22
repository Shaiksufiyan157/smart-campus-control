import express from "express"
import contributeController from "../controllers/contribute.controller.js"
import multer from 'multer'
import cloud from '../cloudinary/index.js'
import cloud2 from "../cloudinary/index2.js"

const upload = multer({storage:cloud.storage })
const upload2=multer({storage:cloud2.storage2})
const router=express.Router()


router.route('/addpdf')
.get(contributeController.renderpdf)
.post(upload2.array('pdf'),contributeController.addpdf)

router.route('/addnotes')
.get(contributeController.renderAddnotes)
.post(upload.single('notes'),contributeController.Addnotes);
router.route('/addpyqs')
.get(contributeController.renderAddpyqs)
.post(upload.single('pyqs'),contributeController.Addpyqs);

export default router;