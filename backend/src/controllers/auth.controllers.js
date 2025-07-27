import { log } from "console";
import User from "../models/user.model.js"
import bcrypt from 'bcryptjs';
import Student from "../models/student.model.js";
import e from "connect-flash";


export const rendersignup = (req, res) => {
  res.render("user/signup.ejs")
}

const renderlogin = (req, res) => {
  res.render("user/login.ejs")
}


const login = async (req, res) => {
  const { email, password, username } = req.body;

  // const user = await User.findOne({ email });
  // if (!user) return res.send('User not found');

  // const valid = await bcrypt.compare(password, user.password);
  // if (!valid) return res.send('Invalid password');

  // const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '1d' });
  // res.cookie('token', token, {
  //   httpOnly: true,
  //   maxAge: 24 * 60 * 60 * 1000 // 1 day
  // });
  res.redirect('home');
};




const registerUser = async (req, res) => {
  console.log(req.body)
  const { email, username, password, phone } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser.user) req.flash('error', 'User already exists');
    // if (existingUser.username) req.flash('error', 'Username already exists');
    // if (existingUser.email) req.flash('error', 'Email already exists');

    const user = new User({ email, username, phone })  // this is the feature of passportjs it doesnot need schema for password and username
    await User.register(user, password)
    res.redirect('/home');
  }
  catch (err) {
    // res.status(500).json({ error: 'Internal Server Error' });
    // console.log(err);
    // req.flash('error', err.message);
    res.redirect('/register');
  }
}
const logout = (req, res, next) => {
  // res.clearCookie('token'); // clears cookie named 'token'-----> this method is for jwt
  req.logout(function (err) {
    if (err) return next(err)
    res.send("loggedout successfully")
  })

};
const RenderStudentForm = (req, res) => {
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