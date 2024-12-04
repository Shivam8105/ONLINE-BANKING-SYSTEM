// authMiddleware.js
function isAuthenticated(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.status(401).json({
      message: 'You must be logged in to access this resource.'
    });
  }

  next(); // Proceed if the user is authenticated
}

module.exports = isAuthenticated;
