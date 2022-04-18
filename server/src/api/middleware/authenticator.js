const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
function authenticateToken(req, res, next) {
  let token = req.header('Authorization');
  if (token) token = token.replace('Bearer ', '');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(400).send('Invalid Token');
  }
}

module.exports = authenticateToken;
