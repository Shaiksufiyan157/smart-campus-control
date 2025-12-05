import express from "express";
import multer from "multer";
import contributeController from "../controllers/contribute.controller.js";
import middleware from '../middleware.js';
import cathAsync from '../utils/cathAsync.js';

const router = express.Router();

// 1. CONFIGURE MULTER (MEMORY STORAGE)
// This stores files in RAM so the controller can access .buffer
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB Limit
});

// 2. HELPER: Upload Middleware with Error Handling
// This handles the specific error if a file is too big
const handleUpload = (fieldName, redirectPath) => (req, res, next) => {
    upload.array(fieldName)(req, res, (err) => {
        if (err?.code === 'LIMIT_FILE_SIZE') {
            req.flash('error', 'File is too large (Max 10MB)');
            return res.redirect(redirectPath);
        }
        if (err) {
            req.flash('error', 'Error uploading file');
            return res.redirect(redirectPath);
        }
        next();
    });
};

// 3. ROUTES

// --- PDF Render Route ---
router.route('/addpdf')
    .get(contributeController.renderpdf);

// --- Notes Route ---
router.route('/addnotes')
    .get(middleware.isLoggedIn, contributeController.renderAddnotes)
    // 'notes' matches <input name="notes"> in your EJS form
    .post(middleware.isLoggedIn, handleUpload('notes', '/addnotes'), cathAsync(contributeController.Addnotes));

// --- PYQs Route ---
router.route('/addpyqs')
    .get(middleware.isLoggedIn, contributeController.renderAddpyqs)
    // 'pyqs' matches <input name="pyqs"> in your EJS form
    .post(middleware.isLoggedIn, handleUpload('pyqs', '/addpyqs'), cathAsync(contributeController.Addpyqs));

export default router;