import express from 'express';
import Faculty from '../models/faculty.model.js';
import middleware from '../middleware.js';
import path from "path"
// import FacultyData from '../seed/FacultyData.js';
import { v2 as cloudinary } from 'cloudinary';
const router = express.Router();
const myLocalFile = 'C:/Users/shaik/Desktop/smart campus control/backend/src/seed/2502.06329v1.pdf';
router.get('/faculty', middleware.isLoggedIn, async (req, res) => {
    // res.send('Faculty Details Page - Under Construction');
    try{
    const faculties = await Faculty.find({});
        // res.status(201).json({ message: 'Faculty data reset successfully.' ,
        //     data: faculties
        // });
        // res.json(faculties)
        // for(const faculty of faculties){
        //     const publicId = path.parse(myLocalFile).name;
        //         const uploadedFile = await cloudinary.uploader.upload(myLocalFile, {
        //         public_id: publicId,
        //         overwrite: true,
        //          });
        //     faculty.paper_published.push({
        //         url: uploadedFile.secure_url,
        //         filename: uploadedFile.public_id,
        //     });
        //     await faculty.save();
        // }
        // console.log("Faculty data updated with paper_published field.");
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

// const AddPapers= async (faculty)=>{

// }
// const Addpyqs = async (req, res) => {
//     const Pyqs = new Pyq(req.body)

// try{
//     const originalName = path.parse(req.file.originalname).name;
//     if (req.file.size > 1000000) {
//         req.flash('error', 'upload less than 10 mb or contact admin')
//         res.redirect('/addpyqs')
//     }
    // const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
    //     public_id: originalName,
    //     overwrite: true,
    // });
//     Pyqs.image = {
//         url: uploadedImage.secure_url,
//         filename: uploadedImage.public_id,
//     };

//     await Pyqs.save();
//     req.flash('success', 'Pyq added successfully');
//     res.redirect('/pyqs');
// }catch(e){
// req.flash('error',e)
// console.log("error")
// res.redirect('/addpyqs')
// }
// }
export default router;