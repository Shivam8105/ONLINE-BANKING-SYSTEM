const express = require('express');
const authController = require('../controllers/auth');
const authControllerProfile = require('../controllers/profileData');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Signup and login routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/profile', authControllerProfile.profile);

// Logout route
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error during logout.' });
    } else {
      res.redirect('/'); // Redirect to the homepage after logout
    }
  });
});

// Middleware to check if the user is logged in via session
function isLoggedIn(req, res, next) {
  if (req.session.user) {
    return next(); // Session-based login
  }
  res.redirect('/login'); // Redirect to the login page if not logged in
}

// Middleware to validate JWT token
function isTokenValid(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized. Please log in.' });
  }

  // Verify the token (using JWT, for example)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; // Attach decoded user info to request object
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token. Please log in again.' });
  }
}

// Open account route - session-based or JWT validation
router.post('/openaccount', isTokenValid, authController.openAccount);

// Dashboard route - requires login via session
router.get('/dashboard', isLoggedIn, (req, res) => {
  res.render('dashboard', { title: 'Dashboard' });
});

module.exports = router;
