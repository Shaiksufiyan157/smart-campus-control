import Note from "../models/notes.model.js"
import path from "path"
import { v2 as cloudinary } from 'cloudinary';

const renderAddnotes = (req, res) => {
    res.render("contribution/notes.ejs")
}
const renderAddpyqs = (req, res) => {
    res.render("contribution/pyq.ejs")
}
const Addnotes = async (req, res) => {
    const content = req.body;
    const Notes = new Note(content);
    // const customName = content.subject + "(" + content.subcode + ")" || 'smart campus control';
console.log("working")
    // const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
    //     public_id: customName,
    //     overwrite: true
    // });
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
    // Notes.image={url:image.path,filename:image.filename};

    console.log(Notes);
    await Notes.save();
    res.redirect('/notes');
}
const Addpyqs = (req, res) => {
    res.send(req.files)
}
const contributeController = {
    renderAddnotes,
    renderAddpyqs,
    Addnotes,
    Addpyqs,
}
export default contributeController;