import express from "express"
// import seedResult from "../controllers/result.controller"
import Result from "../models/result.model.js";
import dummyResults from "../seed/studentdata.js";
const router=express.Router()
import result from "../controllers/result.controller.js"
import { isLoggedIn } from "../middleware.js";

router.get('/addresult',isLoggedIn,result.seedResult)

router.route('/result')
.get(isLoggedIn,result.renderSearch)
.post(result.findResult)

export default router;