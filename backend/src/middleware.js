const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).send('Access Denied: No Token');
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
}
const storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;

  }
  next();
}
const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl
    req.flash('error', 'You must be sign in first')
    return res.redirect('/login');
  }
  next();
}

const middleware = { isLoggedIn, storeReturnTo };

export default middleware;