import { log } from "console";
import User from "../models/user.model.js"
import bcrypt from 'bcryptjs';


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

  res.send(`Signed in! Welcome back, ${username}`);
};
const logout = (req, res) => {
  res.clearCookie('token'); // clears cookie named 'token'
  res.send('Logged out successfully');
};



const registerUser = async (req, res) => {
  console.log(req.body)
  const { email, username, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.send('Email already exists');

    const user = new User({ email, username })  // this is the feature of passportjs it doesnot need schema for password and username
    await User.register(user, password)
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
  registerUser
}

export default authController