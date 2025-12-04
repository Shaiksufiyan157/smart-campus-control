import Student from "../models/student.model.js"
import Result from "../models/result.model.js"
const renderHome = (req, res) => {
    res.render('home.ejs')
}

const renderAcademic = (req, res) => {
    res.render("nav/academic.ejs")
}

const renderAbout = (req, res) => {
    res.render("nav/about.ejs")
}
const FindStudent = async (req, res) => {
    const { usn } = req.params;
    
    // 1. Find Student
    const student = await Student.findOne({ usn: usn });

    const user=req.user;
    if(user.usn!=usn){
        req.flash('error', 'No results found.');
        return res.redirect('/')
    }

    // 2. Find the Result for that student (e.g., specific semester or latest)
    // Here I'm just grabbing the latest one found for that student ID
    const result = await Result.findOne({ student: student._id }).sort({ createdAt: -1 });

    if(!student || !result) {
        req.flash('error', 'No results found.');
        return res.redirect('/');
    }
// res.json({user,student,result})
    // 3. Render the view passing BOTH objects
    res.render('student/studentInfo.ejs', { student, result });
}

const navController = {
    renderHome,
    renderAcademic,
    renderAbout,
    FindStudent
}

export default navController;