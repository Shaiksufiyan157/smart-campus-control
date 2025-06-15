const renderHome = (req, res) => {
    res.render('home.ejs')
}

const renderAcademic = (req, res) => {
    res.render("nav/academic.ejs")
}

const renderResult = (req, res) => {
    // res.render("nav/result.ejs")
    res.send("result")
}

const renderAbout = (req, res) => {
    res.render("nav/about.ejs")
}


const navController = {
    renderHome,
    renderAcademic,
    renderResult,
    renderAbout,

}

export default navController;