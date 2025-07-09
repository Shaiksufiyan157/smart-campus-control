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
const resourcecontroller={
renderpyq,
rendernotes,
renderAddnotes
}
export default resourcecontroller;