import Note from "../models/notes.model.js"
import Pyq from "../models/pyqs.model.js"
import Pdf from "../models/pdf.model.js";
import path, { format } from "path"
import { v2 as cloudinary } from 'cloudinary';
import sharp from "sharp"
import fs from "fs"
import PDFDocument from "pdfkit";
import { PassThrough } from 'stream';

const renderAddnotes = (req, res) => {
    res.render("contribution/notes.ejs")
}
const renderAddpyqs = (req, res) => {
    res.render("contribution/pyq.ejs")
}








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




// const Addnotes = async (req, res) => {
//     const Notes = new Note(req.body);
//     const originalName = path.parse(req.file.originalname).name;
//     const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
//         public_id: originalName,
//         overwrite: true,
//     });
//     Notes.image = {
//         url: uploadedImage.secure_url,
//         filename: uploadedImage.public_id,
//     };


//     // Notes.images = req.files.map(f => ({ url: f.path, filename: f.filename }))--------------------> to upload many images
//     req.flash('success', 'Notes added successfully');

//     await Notes.save();
//     res.redirect('/notes');
// }
const Addnotes = async (req, res) => {


    try {
        if (!req.files || req.files.length === 0) {
            req.flash('error', 'No files uploaded');
            return res.redirect('/notes');
        }

        const uploadToCloudinary = (fileStream) => {
            return new Promise((resolve, reject) => {
                const cloudStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: 'auto',
                        folder: 'notes_pdfs',
                        public_id: `notes-${req.body.subject}`,
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

        // SCENARIO 1: The user uploaded a single PDF file
        // We just pass it through without touching it
        if (req.files[0].mimetype === 'application/pdf') {

            // Create a stream from the buffer
            const pdfStream = new PassThrough();
            pdfStream.end(req.files[0].buffer);

            uploadPromise = uploadToCloudinary(pdfStream);

        }
        // SCENARIO 2: The user uploaded Images (One or Many)
        // We use PDFKit to stitch them together
        else {
            const doc = new PDFDocument({ autoFirstPage: false });

            // Pipe PDFKit into Cloudinary
            uploadPromise = uploadToCloudinary(doc);

            // Add images
            for (const file of req.files) {
                // Skip if a user accidentally mixes a PDF in with images
                if (file.mimetype === 'application/pdf') continue;

                const img = doc.openImage(file.buffer);
                doc.addPage({ size: [img.width, img.height] });
                doc.image(img, 0, 0);
            }
            doc.end();
        }

        // Wait for upload
        const uploadedPdf = await uploadPromise;

        // Save to DB
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
        req.flash('error', 'Something went wrong');
        res.redirect('/notes');
    }
};
const Addpyqs = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            req.flash('error', 'No files uploaded');
            return res.redirect('/pyq');
        }

        const uploadToCloudinary = (fileStream) => {
            return new Promise((resolve, reject) => {
                const cloudStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: 'auto',
                        folder: 'pyqs_pdfs',
                        public_id: `pyq-${req.body.subject}`,
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

        // SCENARIO 1: The user uploaded a single PDF file
        // We just pass it through without touching it
        if (req.files[0].mimetype === 'application/pdf') {

            // Create a stream from the buffer
            const pdfStream = new PassThrough();
            pdfStream.end(req.files[0].buffer);

            uploadPromise = uploadToCloudinary(pdfStream);

        }
        // SCENARIO 2: The user uploaded Images (One or Many)
        // We use PDFKit to stitch them together
        else {
            const doc = new PDFDocument({ autoFirstPage: false });

            // Pipe PDFKit into Cloudinary
            uploadPromise = uploadToCloudinary(doc);

            // Add images
            for (const file of req.files) {
                // Skip if a user accidentally mixes a PDF in with images
                if (file.mimetype === 'application/pdf') continue;

                const img = doc.openImage(file.buffer);
                doc.addPage({ size: [img.width, img.height] });
                doc.image(img, 0, 0);
            }
            doc.end();
        }

        // Wait for upload
        const uploadedPdf = await uploadPromise;

        // Save to DB
        const newPyq = new Pyq(req.body);
        newPyq.pdf = {
            url: uploadedPdf.secure_url,
            filename: uploadedPdf.public_id,
        };

        await newPyq.save();

        req.flash('success', 'Pyq added successfully');
        res.redirect('/pyqs');

    } catch (err) {
        console.error('Error in Addnotes:', err);
        req.flash('error', 'Something went wrong');
        res.redirect('/pyqs');
    }
}

const renderpdf = (req, res) => {
    res.render('contribution/pdf.ejs');
}

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