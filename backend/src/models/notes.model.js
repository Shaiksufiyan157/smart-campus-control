import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NotesSchema = new Schema({
    title: String,
    images: [
        {
            url: String,
            filename: String
        },
    ]
})

const Note=mongoose.model('Note',NotesSchema)
export default Note;