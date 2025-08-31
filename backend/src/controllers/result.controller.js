import Result from "../models/result.model.js";
import dummyResults from "../seed/studentdata.js";


const seedResult=(req,res)=> {
  dummyResults.forEach(async result => {
    const student = new Result({
      name: result.name,
      usn: result.usn,
      subjects: result.subjects
    });
    try {
      await student.save();
      console.log(`Saved: ${result.name}`);
    } catch (err) {
      console.error(`Error saving ${result.name}:`, err.message);
    }
  });
res.send("added succesfully")
}


const renderSearch=(req,res)=>{
res.render('result/searchResult.ejs');
}


const findResult=async (req,res)=>{
const {usn}=req.body;
console.log(usn)
const student= await Result.findOne({usn:usn}).populate('subjects')
console.log(student);
if(student) res.render('result/result',{student});
else {
req.flash('error','Enter the correct USN');
res.redirect('/result')
}
}


const result={
renderSearch,
findResult,
seedResult
}
export default result