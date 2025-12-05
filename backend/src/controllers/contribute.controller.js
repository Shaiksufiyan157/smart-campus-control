import Note from "../models/notes.model.js";
import Pyq from "../models/pyqs.model.js";
import { v2 as cloudinary } from 'cloudinary';

// --- RENDER FUNCTIONS ---
const renderAddnotes = (req, res) => res.render("contribution/notes.ejs");
const renderAddpyqs = (req, res) => res.render("contribution/pyq.ejs");
const renderpdf = (req, res) => res.render('contribution/pdf.ejs');


// --- 1. ADD NOTES (Simple Logic) ---
const Addnotes = async (req, res) => {
    try {
        const newNote = new Note(req.body);

        // File is ALREADY uploaded by the route middleware
        if (req.files && req.files.length > 0) {
            newNote.pdf = {
                url: req.files[0].path,       // Cloudinary URL
                filename: req.files[0].filename // Cloudinary ID
            };
        }

        await newNote.save();
        req.flash('success', 'Notes added successfully');
        res.redirect('/notes');

    } catch (err) {
        console.error('Error in Addnotes:', err);
        req.flash('error', 'Something went wrong');
        res.redirect('/addnotes');
    }
};


// --- 2. ADD PYQS (Previous / Buffer Logic) ---
const Addpyqs = async (req, res) => {
    try {
        // Validation
        if (!req.files || req.files.length === 0) {
            req.flash('error', 'No file uploaded');
            return res.redirect('/addpyqs');
        }

        const file = req.files[0];

        // Strict PDF Check
        if (file.mimetype !== 'application/pdf') {
            req.flash('error', 'Invalid format. Only PDF files are allowed.');
            return res.redirect('/addpyqs');
        }

        // Manual Upload Helper
        const uploadToCloudinary = (buffer) => {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: 'auto',
                        folder: 'pyqs_pdfs',
                        public_id: `pyq-${req.body.subject}-${Date.now()}`,
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(buffer);
            });
        };

        // Perform Upload
        const uploadedPdf = await uploadToCloudinary(file.buffer);

        // Save to DB
        const newPyq = new Pyq(req.body);
        newPyq.pdf = {
            url: uploadedPdf.secure_url,
            filename: uploadedPdf.public_id,
        };

        await newPyq.save();

        req.flash('success', 'PYQ added successfully');
        res.redirect('/pyqs');

    } catch (err) {
        console.error('Error in Addpyqs:', err);
        req.flash('error', 'Something went wrong during upload');
        res.redirect('/addpyqs');
    }
}

const contributeController = {
    renderAddnotes,
    renderAddpyqs,
    Addnotes,
    Addpyqs,
    renderpdf,
}

export default contributeController;