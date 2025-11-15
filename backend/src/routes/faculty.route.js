import express from 'express';
import Faculty from '../models/faculty.model.js';
import middleware from '../middleware.js';
// import FacultyData from '../seed/FacultyData.js';
const router = express.Router();

router.get('/faculty', middleware.isLoggedIn, async (req, res) => {
    // res.send('Faculty Details Page - Under Construction');
    try{
    const faculties = await Faculty.find({});
        // res.status(201).json({ message: 'Faculty data reset successfully.' ,
        //     data: faculties
        // });
        // res.json(faculties)
        res.render('faculty/Faculties.ejs',{faculties});
    }
    catch(e){
        console.error("Error clearing faculty data:", e);
        res.status(500).json({ 
        message: 'Error resetting faculty data', 
        error: e.message // Send the error message for debugging
    });
    }

});
router.get('/faculty/:id', middleware.isLoggedIn, async (req, res) => {
    const { id } = req.params;
    try{
    const faculty = await Faculty.findOne({facultyId: id});
        res.render('faculty/FacultyInfo.ejs',{faculty});
        // res.json(faculty);
    }
    catch(e){
        console.error("Error fetching faculty data:", e);
        res.status(500).json({ 
        message: 'Error fetching faculty data', 
        error: e.message // Send the error message for debugging
    });
    }
});
export default router;