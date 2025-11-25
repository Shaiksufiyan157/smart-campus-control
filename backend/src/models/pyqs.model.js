import mongoose from "mongoose";

const Schema = mongoose.Schema;

const pyqSchema = new Schema({
    subcode: String,
    pdf:
    {
    url: String,
    filename: String
    }
    ,
    subject: String,
    semester: {
        type: String,
        enum: ['1', '2', '3', '4', '5', '6', '7', '8']
    },
    year: {
        type: String
    }
})

const  Pyq=mongoose.model('Pyq',pyqSchema)

export default Pyq;
