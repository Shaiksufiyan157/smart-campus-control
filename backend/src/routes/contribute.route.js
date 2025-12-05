import express from "express";
import multer from "multer";
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import contributeController from "../controllers/contribute.controller.js";
import middleware from '../middleware.js';
import cathAsync from '../utils/cathAsync.js';

// --- 1. IMPORT YOUR CLOUDINARY INSTANCE ---
// We import the default object 'cloud' and extract 'cloudinary' from it
import cloud from '../cloudinary/index.js'; 
const { cloudinary } = cloud;

const router = express.Router();

// ==========================================
// 2. CONFIG FOR NOTES (Auto-Upload to Cloudinary)
// ==========================================
const notesStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'notes_pdfs',
        allowedFormats: ['pdf'],
        // Auto-generate unique filename
        public_id: (req, file) => `notes-${req.body.subject || 'doc'}-${Date.now()}`,
    }
});

const uploadNotes = multer({ 
    storage: notesStorage,
    limits: { fileSize: 10 * 1024 * 1024 } 
});

// Error handling wrapper for Notes
const handleNotesUpload = (fieldName, redirectPath) => (req, res, next) => {
    uploadNotes.array(fieldName)(req, res, (err) => {
        if (err?.code === 'LIMIT_FILE_SIZE') {
            req.flash('error', 'File is too large (Max 10MB)');
            return res.redirect(redirectPath);
        }
        if (err) {
            console.error("Notes Upload Error:", err); // Debugging help
            req.flash('error', 'Error uploading file');
            return res.redirect(redirectPath);
        }
        next();
    });
};


// ==========================================
// 3. CONFIG FOR PYQS (Memory Storage / Buffer)
// ==========================================
const pyqsStorage = multer.memoryStorage();

const uploadPyqs = multer({ 
    storage: pyqsStorage,
    limits: { fileSize: 10 * 1024 * 1024 }
});

// Error handling wrapper for Pyqs
const handlePyqsUpload = (fieldName, redirectPath) => (req, res, next) => {
    uploadPyqs.array(fieldName)(req, res, (err) => {
        if (err?.code === 'LIMIT_FILE_SIZE') {
            req.flash('error', 'File is too large (Max 10MB)');
            return res.redirect(redirectPath);
        }
        if (err) {
            console.error("PYQ Upload Error:", err); // Debugging help
            req.flash('error', 'Error uploading file');
            return res.redirect(redirectPath);
        }
        next();
    });
};


// ==========================================
// 4. ROUTES
// ==========================================

router.route('/addpdf')
    .get(contributeController.renderpdf);

// --- Notes Route (Uses Cloudinary Storage - Simple Controller) ---
router.route('/addnotes')
    .get(middleware.isLoggedIn, contributeController.renderAddnotes)
    .post(middleware.isLoggedIn, handleNotesUpload('notes', '/addnotes'), cathAsync(contributeController.Addnotes));

// --- PYQs Route (Uses Memory Storage - Buffer Controller) ---
router.route('/addpyqs')
    .get(middleware.isLoggedIn, contributeController.renderAddpyqs)
    .post(middleware.isLoggedIn, handlePyqsUpload('pyqs', '/addpyqs'), cathAsync(contributeController.Addpyqs));

export default router;