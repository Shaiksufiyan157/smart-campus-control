// import


const renderpyq=(req,res)=>{
res.render('resources/pyq.ejs')
}
const rendernotes=(req,res)=>{
res.render("resources/notes.ejs")
}
const renderAddnotes=(req,res)=>{
res.render("contribution/notes.ejs")
}
const renderAddpyqs=(req,res)=>{
res.render("contribution/pyq.ejs")
}
const Addnotes=(req,res)=>{
res.send(req.files)
}
const Addpyqs=(req,res)=>{
res.send(req.files)
}
const resourcecontroller={
renderpyq,
rendernotes,
renderAddnotes,
renderAddpyqs,
Addnotes,
Addpyqs
}
export default resourcecontroller;