import { log } from "console";
import User from "../models/user.model.js"
import bcrypt from 'bcryptjs';
import Student from "../models/student.model.js";
import e from "connect-flash";
import catchAsync from "../utils/cathAsync.js";

export const rendersignup = (req, res) => {
  res.render("user/signup.ejs")
}

const renderlogin = (req, res) => {
  res.render("user/login.ejs")
}


const login = async (req, res) => {
  const { usn } = req.body;
  const user = await Student.findOne({ usn });
  const redirectUrl = res.locals.returnTo || '/home';
  delete req.session.returnTo


if (user.registeredSubjects && user.registeredSubjects.length > 0) {
  req.session.isRegistered = true;
} else {
  req.session.isRegistered = false;
}
  req.flash('success', `Welome back ${user.name}`);
  res.redirect(redirectUrl);
// res.send("hello")
};




const registerUser = catchAsync(async (req, res) => {
  try {
    const { email, username, password, phone } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash('error', 'user already exists with this email');
    }
    const user = new User({ email, username, phone })  // this is the feature of passportjs it doesnot need schema for password and username
    const registereduser = await User.register(user, password)
    req.login(registereduser, err => {
      if (err) return next(err)
      else {
        req.flash('success', `${username}, welcome to Smart Campus Control`);
        res.redirect('/home')
      }
    })
  }
  catch (e) {
req.flash('error', 'user already exists with this credentials');
    res.redirect('register');
  }

});
const logout = (req, res, next) => {
  // res.clearCookie('token'); // clears cookie named 'token'-----> this method is for jwt
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash('success', 'Logged out successfully');
    res.redirect("/home")
  })

};
const RenderStudentForm = (req, res) => {
  req.flash('error', 'user not registered')
  res.render('student/new')
}

const RegisterStudent = async (req, res) => {
  const { email,
    username,
    password,
    phone,
    USN,
    semester,
    branch,
    currentCGPA,
    MotherName,
    FatherName
  } = req.body;
  try {
    const existingUser = await Student.findOne({ USN });
    if (existingUser) return res.send('USN already exists');

    const user = new Student({
      email,
      username,
      phone,
      USN,
      semester,
      branch,
      currentCGPA,
      MotherName,
      FatherName
    })  // this is the feature of passportjs it doesnot need schema for password and username
    await Student.register(user, password)
    res.redirect('/home');
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



const authController = {
  rendersignup,
  renderlogin,
  login,
  logout,
  registerUser,
  RegisterStudent,
  RenderStudentForm
}

export default authController