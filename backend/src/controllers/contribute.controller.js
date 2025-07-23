import Note from "../models/notes.model.js"
import Pyq from "../models/pyqs.model.js"
import Pdf from "../models/pdf.model.js";
import path, { format } from "path"
import { v2 as cloudinary } from 'cloudinary';
import sharp from "sharp"
import fs from "fs"
// import cloud from "../cloudinary/index.js";


const renderAddnotes = (req, res) => {
    res.render("contribution/notes.ejs")
}
const renderAddpyqs = (req, res) => {
    res.render("contribution/pyq.ejs")
}




// --------------------------------------------------------------------------->
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
        res.redirect('/notes');
    } catch (error) {
        console.error('Error during file compression or upload:', error);
        res.status(500).send('Error during compression or upload');
    }
}



// ------------------------------------>




const Addnotes = async (req, res) => {
    const Notes = new Note(req.body);


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

    await Notes.save();
    res.redirect('/notes');
}
const Addpyqs = async (req, res) => {
    const Pyqs = new Pyq(req.body)
    // res.send(req.files)
    const originalName = path.parse(req.file.originalname).name;
    console.log(originalName)
    const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
        public_id: originalName,
        overwrite: true,
    });
    Pyqs.image = {
        url: uploadedImage.secure_url,
        filename: uploadedImage.public_id,
    };


    console.log(req.file)
    console.log(Pyqs)
    await Pyqs.save();
    res.redirect('/pyqs');
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
    // AddnotesDemo
}
export default contributeController;