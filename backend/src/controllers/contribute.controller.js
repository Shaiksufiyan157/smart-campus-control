import Note from "../models/notes.model.js"
import Pyq from "../models/pyqs.model.js"
import Pdf from "../models/pdf.model.js";
import path, { format } from "path"
import { v2 as cloudinary } from 'cloudinary';


const renderAddnotes = (req, res) => {
    res.render("contribution/notes.ejs")
}
const renderAddpyqs = (req, res) => {
    res.render("contribution/pyq.ejs")
}
const Addnotes = async (req, res) => {
// res.send("qkdjqpkcd b/")
    const Notes = new Note(req.body);
    // const customName = content.subject + "(" + content.subcode + ")" || 'smart campus control';
    // const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
    //     public_id: customName,
    //     overwrite: true
    // });

    if (req.file.mimetype === "image/jpeg" || req.file.mimetype === "image/png" || req.file.mimetype === "image/jpg") {
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

    }
    // else {
    // const image = req.file;
    // Notes.image = { url: image.path, filename: image.filename };
    // }


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
const addpdf = (req, res) => {
    const Pdfs = new Pdf(req.body)
    console.log(Pdfs)
    console.log(req.file)
    res.send("it is working")
}
const contributeController = {
    renderAddnotes,
    renderAddpyqs,
    Addnotes,
    Addpyqs,
    renderpdf,
    addpdf
}
export default contributeController;