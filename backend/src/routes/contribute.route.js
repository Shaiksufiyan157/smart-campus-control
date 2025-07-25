import dotenv from 'dotenv';
dotenv.config()

import express from "express"
import contributeController from "../controllers/contribute.controller.js"
import multer from 'multer'
import cloud from '../cloudinary/index.js'
import sharp from "sharp"
import { PDFDocument as PDFDocument } from "pdf-lib"
import path from 'path';
const upload = multer({ storage: cloud.storage })
const router = express.Router()
import fs from "fs"

import ILovePDFApi from "@ilovepdf/ilovepdf-nodejs"
// import ILovePDFFile from '@ilovepdf/ilovepdf-js/ILovePDFFile.';

const ilovepdf = new ILovePDFApi(process.env.ILP_PUBLIC_KEY, process.env.ILP_SECRET_KEY);






// ----------------------------->

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});


const upload2 = multer({ storage })



// -------------------
router.route('/addpdf')
    .get(contributeController.renderpdf)
    .post(upload2.single('pdf'), async (req, res) => {

        // console.log(req.file.path)

        // const originalName = req.file.originalname;
        // const filePath = `./uploads/${originalName}`;
        // const fileBuffer = fs.readFileSync(filePath);
        const task = await ilovepdf.newTask('compress');
        // const file = new ILovePDFFile(fileBuffer, originalName);
        task.start()
            .then(() => {
                return task.addFile('uploads/dip assignment 121.pdf');
            })
            .then(() => {
                return task.process();
            })
            .then(() => {
                return task.download();
            })
            .then((data) => {
                console.log(data)
                fs.writeFileSync('uploads/oomd notes test.pdf', data);
                // filepath: c:\Users\shaik\Desktop\smart campus control\backend\src\routes\contribute.route.js
                // fs.writeFileSync('C:\Users\shaik\Desktop\smart campus control\backend\uploads\dip assignment 121.pdf', data);
            })
            .catch((error) => {
                console.error('Error:', error);
                console.log("hello from error")
            })

        res.send("working fine")
        console.log("hello from no error")
        // ---------------------------------->

        // ---------------------------->
    })

const compressFile = async (existingToBytes, originalname) => {

    const pdfDoc = await PDFDocument.load(existingToBytes);
    const compressedPdfBytes = await pdfDoc.save();
    fs.writeFileSync(`./uploads/compressed/${originalname}`, compressedPdfBytes);
}








// ----------------



router.route('/addnotes')
    .get(contributeController.renderAddnotes)
    .post(upload.single('notes'), contributeController.Addnotes);
router.route('/addpyqs')
    .get(contributeController.renderAddpyqs)
    .post(upload.single('pyqs'), contributeController.Addpyqs);

export default router;