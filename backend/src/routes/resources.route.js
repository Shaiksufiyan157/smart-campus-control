import express from "express"
import resourcecontroller from "../controllers/resources.controllers.js";
import multer from 'multer'
const upload = multer({ dest: 'uploads/' })
const router=express.Router()



router.get('/pyq',resourcecontroller.renderpyq);
router.get('/notes',resourcecontroller.rendernotes);

router.route('/addnotes')
.get(resourcecontroller.renderAddnotes)
.post(upload.array('notes'),(req,res)=>{
res.send(req.body,req.files);
});
export default router;
