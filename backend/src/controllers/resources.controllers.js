import Note from "../models/notes.model.js"

const renderpyq = (req, res) => {
    res.render('resources/pyq.ejs')
}
const rendernotes = async (req, res) => {
    const notes = await Note.find({});
    res.render("resources/notes.ejs", { notes })
}

const filter = async (req, res) => {
    const title = req.body.title;
    if (title === "") {
        const notes = await Note.find({});
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