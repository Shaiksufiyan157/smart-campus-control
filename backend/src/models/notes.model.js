import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NotesSchema = new Schema({
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
    module: {
        type: String,
        enum: ['1', '2', '3', '4', '5']
    }
})

const Note = mongoose.model('Note', NotesSchema)
export default Note;