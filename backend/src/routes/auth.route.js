import express from "express"
import authController from "../controllers/auth.controllers.js"
import passport from "passport"
import User from "../models/user.model.js"
const router = express.Router()




// router.post('/register', async (req, res, next) => {
//     // try {
//         const { email, username, password } = req.body;
//         const user = new User({ email, username });
//         const registeredUser = await User.register(user, password);
//         req.login(registeredUser, err => {
//             // if (err) return next(err);
//             // req.flash('success', 'Welcome to Yelp Camp!');
//             // res.redirect('/campgrounds');
//         })
//     // } catch (e) {
//     //     req.flash('error', e.message);
//     //     res.redirect('register');
//     // }
// });



router.route('/signup')
    .get(authController.rendersignup)
    .post(authController.registerUser)

router.route('/login')
    .get(authController.renderlogin)
    .post(passport.authenticate('local', { failureRedirect: '/login' }), authController.login)

router.route('/logout')
    .post(authController.logout)

export default router;