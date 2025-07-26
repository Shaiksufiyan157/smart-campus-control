// const fs = require('fs');
// const path = require('path');
// const { BaseFile } = require('@ilovepdf/ilovepdf-js-core');
// const ILovePDFApi = require('@ilovepdf/ilovepdf-nodejs');
// require('dotenv').config();
// const PdfParse = require('pdf-parse');
// const { default: Pdf } = require('../models/pdf.model');
// const ilovepdf = new ILovePDFApi(process.env.ILP_PUBLIC_KEY, process.env.ILP_SECRET_KEY);

// async function compressPDF(filePath, originalName, outputName) {
//   const task = await ilovepdf.newTask('compress');
//   const fileBuffer = fs.readFileSync(filePath);
//   const baseFile = BaseFile.fromBuffer(fileBuffer, originalName);
//   const data = await PdfParse(fileBuffer);
//   await task.start();
//   await task.addFile(data);
//   await task.process();
//   const result = await task.download();

//   const outPath = path.join('uploads', outputName);
//   fs.writeFileSync(outPath, result);
//   return outPath;
// }

// module.exports = { compressPDF };
