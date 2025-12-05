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
    try {
        const { usn } = req.params;

        // FIX 1: Check if user is logged in first to prevent crash
        if (!req.user) {
            req.flash('error', 'You must be logged in.');
            return res.redirect('/login'); 
        }

        // FIX 2: Security check
        // Ensure both are compared as strings to avoid Type mismatch
        if (req.user.usn.toString() !== usn.toString()) {
            req.flash('error', 'Unauthorized access.');
            return res.redirect('/');
        }

        // 1. Find Student
        const student = await Student.findOne({ usn: usn });

        // FIX 3: Check if student exists BEFORE searching for results
        // If we don't check this, 'student._id' below will throw an error
        if (!student) {
            req.flash('error', 'Student not found.');
            return res.redirect('/');
        }

        // 2. Find the Result
        const result = await Result.findOne({ student: student._id }).sort({ createdAt: -1 });

        if (!result) {
            req.flash('error', 'No results found for this student.');
            return res.render('student/StudentInfo.ejs', { student, result: null });
        }

        // 3. Render
        res.render('student/StudentInfo.ejs', { student, result });

    } catch (e) {
        console.error("Error in FindStudent:", e);
        // FIX 4: Do not send JSON for a page render route, it confuses the browser
        req.flash('error', 'Something went wrong fetching the data.');
        res.redirect('/');
    }
}

const navController = {
    renderHome,
    renderAcademic,
    renderAbout,
    FindStudent
}

export default navController;