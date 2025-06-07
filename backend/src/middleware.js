import jwt from 'jsonwebtoken';
// import cookieParser from 'cookie-parser'
// app.use(cookieParser());


function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).send('Access Denied: No Token');
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
}

export default authenticateToken;