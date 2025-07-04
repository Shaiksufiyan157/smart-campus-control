// import


const renderpyq=(req,res)=>{
res.render('resources/pyq.ejs')
}
const rendernotes=(req,res)=>{
res.send("notes")
}
const resourcecontroller={
renderpyq,
rendernotes
}
export default resourcecontroller;