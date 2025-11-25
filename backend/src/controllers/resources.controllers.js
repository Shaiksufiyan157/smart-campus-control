import Note from "../models/notes.model.js"
import Pyq from "../models/pyqs.model.js"

const renderpyq = async (req, res) => {
    const pyqs = await Pyq.find({})
    res.render('resources/pyq.ejs', { pyqs})

}
const rendernotes = async (req, res) => {
    const notes = await Note.find({})
    // res.json(notes)
    res.render("resources/notes.ejs", { notes })

}

const filter = async (req, res) => {
    const title = req.body.title;
    if (title === "") {
        const notes = await Note.find({})
        res.render("resources/notes.ejs", { notes })
    }
    else {
        const notes = await Note.find({ title });
        res.render("resources/notes.ejs", { notes })
    }

}

const resourcecontroller = {
    renderpyq,
    rendernotes,
    filter
}
export default resourcecontroller;