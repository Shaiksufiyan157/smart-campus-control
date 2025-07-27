const authenticateToken=(req, res, next) =>{
  const token = req.cookies.token;
  if (!token) return res.status(401).send('Access Denied: No Token');
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
}

export const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

export default {isLoggedIn};