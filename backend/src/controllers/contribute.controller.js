import Note from "../models/notes.model.js";
import Pyq from "../models/pyqs.model.js";
import { v2 as cloudinary } from 'cloudinary';
import PDFDocument from "pdfkit"; // Required for stitching images

// --- RENDER FUNCTIONS ---
const renderAddnotes = (req, res) => res.render("contribution/notes.ejs");
const renderAddpyqs = (req, res) => res.render("contribution/pyq.ejs");
const renderpdf = (req, res) => res.render('contribution/pdf.ejs');


// ==========================================
// 1. ADD NOTES (Simple - PDF Only)
// ==========================================
const Addnotes = async (req, res) => {
    try {
        const newNote = new Note(req.body);

        // Route Middleware already uploaded the file to Cloudinary
        if (req.files && req.files.length > 0) {
            newNote.pdf = {
                url: req.files[0].path,       
                filename: req.files[0].filename 
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


// ==========================================
// 2. ADD PYQS (Smart - PDF or Multiple Images)
// ==========================================
const Addpyqs = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            req.flash('error', 'No files uploaded');
            return res.redirect('/addpyqs');
        }

        // --- HELPER: Upload Function ---
        const uploadToCloudinary = (streamOrBuffer) => {
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
                
                // Handle both Buffer (single file) and Stream (PDFKit)
                if (streamOrBuffer.pipe) {
                    streamOrBuffer.pipe(uploadStream); // It's a stream (PDFKit)
                } else {
                    uploadStream.end(streamOrBuffer);  // It's a buffer (Single PDF)
                }
            });
        };

        let uploadPromise;

        // SCENARIO A: Single PDF File
        // (If the first file is PDF, we assume it's just one PDF)
        if (req.files[0].mimetype === 'application/pdf') {
            uploadPromise = uploadToCloudinary(req.files[0].buffer);
        }
        
        // SCENARIO B: Multiple Images -> Stitch into 1 PDF
        else {
            const doc = new PDFDocument({ autoFirstPage: false });
            
            // Start uploading the stream immediately
            uploadPromise = uploadToCloudinary(doc);

            for (const file of req.files) {
                // Skip non-image files to prevent errors
                if (!file.mimetype.startsWith('image/')) continue;

                // Create a page for each image
                const img = doc.openImage(file.buffer);
                doc.addPage({ size: [img.width, img.height] });
                doc.image(img, 0, 0);
            }
            doc.end(); // Finish the PDF
        }

        // Wait for upload to complete
        const uploadedFile = await uploadPromise;

        // Save to DB
        const newPyq = new Pyq(req.body);
        newPyq.pdf = {
            url: uploadedFile.secure_url,
            filename: uploadedFile.public_id,
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