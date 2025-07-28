import Note from "../models/notes.model.js"
import Pyq from "../models/pyqs.model.js"
import Pdf from "../models/pdf.model.js";
import path, { format } from "path"
import { v2 as cloudinary } from 'cloudinary';
import sharp from "sharp"
import fs from "fs"
import { PDFDocument } from "pdf-lib";
// import cloud from "../cloudinary/index.js";

const renderAddnotes = (req, res) => {
    res.render("contribution/notes.ejs")
}
const renderAddpyqs = (req, res) => {
    res.render("contribution/pyq.ejs")
}




// --------------------------------------------------------------------------->



// cons
const addpdf = async (req, res) => {
    const Pdfs = new Pdf(req.body);

    const originalName = path.parse(req.file.originalname).name;
    console.log(originalName);
    const originalSize = req.file.size;
    console.log('Original File Size:', originalSize / 1024, 'KB');
    // Path for the compressed image
    const compressedFilePath = path.join('uploads', req.file.filename + '.jpg');


    try {
        // Compress the image using sharp (resize and compress to jpeg)
        await sharp(req.file.path)
            .resize(800) // Resize image to max width 800px (optional)
            .jpeg({ quality: 70 }) // Compress the image to 70% quality (optional)
            .toFile(compressedFilePath); // Save compressed file
        const compressedFileSize = fs.statSync(compressedFilePath).size;
        console.log('Compressed File Size:', compressedFileSize / 1024, 'KB');
        // Upload the compressed file to Cloudinary
        const uploadedImage = await cloudinary.uploader.upload(compressedFilePath, {
            public_id: originalName,
            overwrite: true,
        });

        Pdfs.image = {
            url: uploadedImage.secure_url,
            filename: uploadedImage.public_id,
        };

        // Optionally, remove the local compressed file after upload
        fs.unlinkSync(compressedFilePath);

        // Save the note
        console.log(Pdfs)
        await Pdfs.save();
        res.redirect('/pyqs',);
    } catch (error) {
        console.error('Error during file compression or upload:', error);
        res.status(500).send('Error during compression or upload');
    }

}
// ------------------------>
const addpdf2 = async (req, res) => {
    try {



        if (req?.file) {

            const filePath = `./uploads/${req.file.originalname}`
            const existingToBytes = fs.readFileSync(filePath);
            compressFile(existingToBytes, req, file.originalname);
            return res.status(200).send("file uploaded");
        }
    }
    catch (error) {

        return res.status(500).send(`file was not uploaded ${error}`)

    }

}


const compressFile = async (existingToBytes, originalname) => {

    const pdfDoc = await PDFDocument.load(existingToBytes);
    const compressedPdfBytes = await pdfDoc.save();
    fs.writeFileSync(`./uploads/compressed/${originalname}`, compressedPdfBytes);
}


// ------------------------------------>




const Addnotes = async (req, res) => {
    const Notes = new Note(req.body);
    console.log(req.file)
    const originalName = path.parse(req.file.originalname).name;
    console.log(originalName)
    const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
        public_id: originalName,
        overwrite: true,
    });
    Notes.image = {
        url: uploadedImage.secure_url,
        filename: uploadedImage.public_id,
    };


    // Notes.images = req.files.map(f => ({ url: f.path, filename: f.filename }))--------------------> to upload many images
    req.flash('success', 'Notes added successfully');

    await Notes.save();
    res.redirect('/notes');
}
const Addpyqs = async (req, res) => {
    const Pyqs = new Pyq(req.body)

try{
    const originalName = path.parse(req.file.originalname).name;
    console.log(originalName)
    if (req.file.size > 1000000) {
        req.flash('error', 'upload less than 10 mb or contact admin')
        res.redirect('/addpyqs')
    }
    const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
        public_id: originalName,
        overwrite: true,
    });
    Pyqs.image = {
        url: uploadedImage.secure_url,
        filename: uploadedImage.public_id,
    };

    await Pyqs.save();
    req.flash('success', 'Pyq added successfully');
    res.redirect('/pyqs');
}catch(e){
req.flash('error',e)
console.log("error")
res.redirect('/addpyqs')
}
}

const renderpdf = (req, res) => {
    res.render('contribution/pdf.ejs');
}
// const addpdf = (req, res) => {
//     const Pdfs = new Pdf(req.body)
//     console.log(Pdfs)
//     console.log(req.file)
//     res.send("it is working")
// }
const contributeController = {
    renderAddnotes,
    renderAddpyqs,
    Addnotes,
    Addpyqs,
    renderpdf,
    addpdf,
    addpdf2
    // AddnotesDemo
}
export default contributeController;