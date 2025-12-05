import express from "express";
import QRCode from "qrcode";
import ResultSchema from "../models/result.model.js";
import Faculty from "../models/faculty.model.js";
import { v2 as cloudinary } from 'cloudinary';
import addResult from "./lib.js";
import Student from "../models/student.model.js";
const router=express.Router();
import dotenv from "dotenv";
dotenv.config();

router.get('/generate-qr',async (req,res)=>{
  const student = await Student.findOne({ usn: '3PD22CG032' });
  
   const url = `http://smart-campus-control.vercel.app/student/${student.usn}`;
   const qrCodeDataUrl = await QRCode.toDataURL(url);
      const base64Str = qrCodeDataUrl.replace(/^data:image\/png;base64,/, "");
    // res.send(`<img src="${qrCodeDataUrl}" alt="QR Code" />`);
    const uploadResponse = await cloudinary.uploader.upload(`data:image/png;base64,${base64Str}`, {
      folder: 'student_qrcodes',
      public_id: student.usn, // optional: name the file with student USN
      overwrite: true
    });
      student.qrCodeString = uploadResponse.secure_url;
    await student.save()
    res.send("added")
})
// .get(addResult)


// try {
  //   const student = await ResultSchema.findOne({ usn: '1AI21CS001' });
  //   if (!student) return res.status(404).send('Student not found');
  //  const url = `http://${process.env.HOST}/student/${student.usn}`;
  //   const qrCodeDataUrl = await QRCode.toDataURL(url);
  //   const base64Str = qrCodeDataUrl.replace(/^data:image\/png;base64,/, "");
  //   // res.send(`<img src="${qrCodeDataUrl}" alt="QR Code" />`);
  //   const uploadResponse = await cloudinary.uploader.upload(`data:image/png;base64,${base64Str}`, {
  //     folder: 'student_qrcodes',
  //     public_id: student.usn, // optional: name the file with student USN
  //     overwrite: true
  //   });

  //   // Save the Cloudinary URL in student_qr field
  //   student.student_qr = uploadResponse.secure_url;
  //   await student.save();
  //   res.redirect(`/student/${student.usn}`);
  // const AllFaculty=await Faculty.find({});


  // for(const faculty of AllFaculty){
  //   const url = `http://smart-campus-control.vercel.app/faculty/${faculty.facultyId}`;
  //   const qrCodeDataUrl = await QRCode.toDataURL(url);
  //   const base64Str = qrCodeDataUrl.replace(/^data:image\/png;base64,/, "");
  //   const uploadResponse = await cloudinary.uploader.upload(`data:image/png;base64,${base64Str}`, {
  //     folder: 'faculty_qrcodes',
  //     public_id: faculty.facultyId, // optional: name the file with faculty ID
  //     overwrite: true
  //   });
  //   // Save the Cloudinary URL in faculty_qr field
  //   faculty.faculty_qr = uploadResponse.secure_url;
  //   await faculty.save();
  //   console.log(`QR code generated and saved for faculty ID: ${faculty.facultyId}`);
  // }
  // console.log('QR code generation completed for all faculty members.');
  // res.json({AllFaculty});
  
  // } catch (error) {
    // res.status(500).send('Error generating QR code');
  // }
  // res.send('QR code generation script executed. Check server logs for details.');
// }
router.get('/student/:id', async (req, res) => {
    const usn = req.params.id;
    try {
        const student = await ResultSchema.findOne({ usn: usn });   
        if (!student) return res.status(404).send('Student not found');
        res.render('student/StudentInfo.ejs', { student });
    } catch (error) {
        res.status(500).send('Error fetching student data');
    }
})
router.get('/seed-student',(req,res)=>{

})
export default router;