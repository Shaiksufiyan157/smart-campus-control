const renderHome = (req, res) => {
    res.render('home.ejs')
}

const renderAcademic = (req, res) => {
    res.render("nav/academic.ejs")
}

const renderAbout = (req, res) => {
    res.render("nav/about.ejs")
}


const navController = {
    renderHome,
    renderAcademic,
    renderAbout,
}

export default navController;