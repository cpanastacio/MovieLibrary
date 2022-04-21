function requireAuth(req, res, next) {
  const { user } = req.session;
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  return next();
}

module.exports = requireAuth;
