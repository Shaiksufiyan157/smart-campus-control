import express from "express"
import resourcecontroller from "../controllers/resources.controllers.js";

const router=express.Router()

router.get('/pyq',resourcecontroller.renderpyq);

router.get('/notes',resourcecontroller.rendernotes);

export default router;
