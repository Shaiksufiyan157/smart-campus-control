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
.post(upload.array('notes'),(req,res)=>{
res.send(req.files);
});
export default router;
