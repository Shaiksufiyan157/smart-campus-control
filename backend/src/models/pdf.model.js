import mongoose from "mongoose";

const Schema = mongoose.Schema;


const PdfSchema = new Schema({
    title: String,

    image: {
        filename: String,
        url: String
    
    }

})

const Pdf =mongoose.model('Pdf',PdfSchema)

export default Pdf