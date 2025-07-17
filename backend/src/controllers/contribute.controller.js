import Note from "../models/notes.model.js"

const renderAddnotes = (req, res) => {
    res.render("contribution/notes.ejs")
}
const renderAddpyqs = (req, res) => {
    res.render("contribution/pyq.ejs")
}
const Addnotes = async (req, res) => {
    const Notes = new Note(req.body);
    // Notes.name=req.body.;
    Notes.images = req.files.map(f => ({ url: f.path, filename: f.filename }))
    await Notes.save();
    res.redirect('/notes');
}
const Addpyqs = (req, res) => {
    res.send(req.files)
}
const contributeController = {
    renderAddnotes,
    renderAddpyqs,
    Addnotes,
    Addpyqs,
}
export default contributeController;