import Note from "../models/notes.model.js";
import Pyq from "../models/pyqs.model.js";
import { v2 as cloudinary } from 'cloudinary';
import PDFDocument from "pdfkit";
import { PassThrough } from 'stream';

// --- RENDER FUNCTIONS ---
const renderAddnotes = (req, res) => {
    res.render("contribution/notes.ejs");
}
const renderAddpyqs = (req, res) => {
    res.render("contribution/pyq.ejs");
}
const renderpdf = (req, res) => {
    res.render('contribution/pdf.ejs');
}

// --- MAIN LOGIC ---

const Addnotes = async (req, res) => {
    try {
        // 1. Basic Validation
        if (!req.files || req.files.length === 0) {
            req.flash('error', 'No files uploaded');
            return res.redirect('/addnotes');
        }
        if (!req.body.subject) {
            req.flash('error', 'Subject is required');
            return res.redirect('/addnotes');
        }

        // 2. Helper: Upload Stream to Cloudinary
        const uploadToCloudinary = (fileStream) => {
            return new Promise((resolve, reject) => {
                const cloudStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: 'auto',
                        folder: 'notes_pdfs',
                        // CRITICAL FIX: Added Date.now() to prevent overwriting
                        public_id: `notes-${req.body.subject}-${Date.now()}`, 
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                fileStream.pipe(cloudStream);
            });
        };

        let uploadPromise;

        // SCENARIO 1: Single PDF (Pass-through)
        if (req.files[0].mimetype === 'application/pdf') {
            const pdfStream = new PassThrough();
            pdfStream.end(req.files[0].buffer);
            uploadPromise = uploadToCloudinary(pdfStream);
        }
        // SCENARIO 2: Images (Stitch to PDF)
        else {
            const doc = new PDFDocument({ autoFirstPage: false });
            uploadPromise = uploadToCloudinary(doc);

            for (const file of req.files) {
                if (file.mimetype === 'application/pdf') continue;

                const img = doc.openImage(file.buffer);
                doc.addPage({ size: [img.width, img.height] });
                doc.image(img, 0, 0);
            }
            doc.end();
        }

        // 3. Wait & Save
        const uploadedPdf = await uploadPromise;

        const newNote = new Note(req.body);
        newNote.pdf = {
            url: uploadedPdf.secure_url,
            filename: uploadedPdf.public_id,
        };

        await newNote.save();

        req.flash('success', 'Notes added successfully');
        res.redirect('/notes');

    } catch (err) {
        console.error('Error in Addnotes:', err);
        req.flash('error', 'Something went wrong during upload');
        res.redirect('/addnotes');
    }
};

const Addpyqs = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            req.flash('error', 'No files uploaded');
            return res.redirect('/addpyqs');
        }
        if (!req.body.subject) {
            req.flash('error', 'Subject is required');
            return res.redirect('/addpyqs');
        }

        const uploadToCloudinary = (fileStream) => {
            return new Promise((resolve, reject) => {
                const cloudStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: 'auto',
                        folder: 'pyqs_pdfs',
                        // CRITICAL FIX: Added Date.now()
                        public_id: `pyq-${req.body.subject}-${Date.now()}`,
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                fileStream.pipe(cloudStream);
            });
        };

        let uploadPromise;

        if (req.files[0].mimetype === 'application/pdf') {
            const pdfStream = new PassThrough();
            pdfStream.end(req.files[0].buffer);
            uploadPromise = uploadToCloudinary(pdfStream);
        } else {
            const doc = new PDFDocument({ autoFirstPage: false });
            uploadPromise = uploadToCloudinary(doc);

            for (const file of req.files) {
                if (file.mimetype === 'application/pdf') continue;
                const img = doc.openImage(file.buffer);
                doc.addPage({ size: [img.width, img.height] });
                doc.image(img, 0, 0);
            }
            doc.end();
        }

        const uploadedPdf = await uploadPromise;

        const newPyq = new Pyq(req.body);
        newPyq.pdf = {
            url: uploadedPdf.secure_url,
            filename: uploadedPdf.public_id,
        };

        await newPyq.save();

        req.flash('success', 'Pyq added successfully');
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