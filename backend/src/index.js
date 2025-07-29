import express from "express"
import authRouter from './routes/auth.route.js'
import StudentRouter from './routes/student.route.js'
import resultRoute from './routes/result.route.js'
import { connectDB } from "./lib/db.js"
import ejs from "ejs"
import ejsMate from "ejs-mate"
import path from "path"
import User from "./models/user.model.js"
import MongoDBStore from "connect-mongo"
import session from "express-session"
import passport from "passport"
import LocalStrategy from "passport-local"
import { fileURLToPath } from 'url'; // this is for --------->"type" : "module only"
import { dirname } from "path" // this is for --------->"type" : "module only"
import cookieParser from 'cookie-parser'
import Student from "./models/student.model.js"
import ResourceRouter from './routes/resources.route.js'
import dotenv from 'dotenv'
import ContributeRouter from './routes/contribute.route.js'
import bodyParser from "body-parser"
import flash from "connect-flash"
import serverless from 'serverless-http';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config()
const app = express()

app.use(express.urlencoded({ extended: true })); // this is neccassary to read html form otherwise it will show error
app.use(express.json()) // this will parse the form data
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static('src/public'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// const store = MongoDBStore.create({
//     mongoUrl: process.env.DB_URI,// this creates a session collection in mongo database
//     touchAfter: 24 * 60 * 60,
//     crypto: {
//         secret: 'thisshouldbeabettersecret!'
//     },
//     collectionName: 'session'
// });

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
// app.use(session({
//     secret: 'thisshouldbeabettersecret!',
//     resave: false,
//     saveUninitialized: true,
//     store: store,
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24 //Equals 24 hours
//     }
// }))

app.use(session(sessionConfig))
app.use(flash())


app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy({
    usernameField: 'email'
},User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/', authRouter)
app.use('/', StudentRouter)
app.use('/',ResourceRouter)
app.get('/', (req, res) => {
    res.render('home.ejs')
})
app.use('/',ContributeRouter);
app.use('/',resultRoute);

// app.use('*',(req,res,next)=>{
//     res.render('notfound.ejs')
// next();
// })

app.use((req,res)=>{
res.render('notfound.ejs')
})
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("serving on port: " + PORT)
    connectDB()
})
// export default serverless(app);