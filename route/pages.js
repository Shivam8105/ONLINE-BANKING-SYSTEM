const express = require('express');
const authMiddleware = require('../middleware/authMiddleware'); // Adjust path as necessary
const router = express.Router();

// Route to render the dashboard
router.get('/', (req, res) => {
  res.render('dashboard');
});

// Route to render the signup page
router.get('/signup', (req, res) => {
  res.render('signup');
});

// Route to render the login page
router.get('/login', (req, res) => {
  res.render('login');
});

// Route to render the dashboard page
router.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

// Route to render the bank form (for opening a new account or other banking actions)
router.get('/bankform', (req, res) => {
  res.render('bankForm');
});

// Protected profile route
router.get('/profile', authMiddleware, (req, res) => {
  const user = req.session.user; // Assuming user data is stored in session

  // Check if the user is authenticated and render the profile page
  if (user) {
      res.render('profile', {
          username:  user.firstName && user.lastName 
          ? `${user.firstName} ${user.lastName}` 
          : 'User',
          email: user.email || 'Not provided',
          phone: user.phone || 'Not provided',
          DOB : user.DOB ,
          gender : user.gender,
          initialDeposit: user.initialDeposit,
          accountNumber: user.userId|| 'Not specified',
          ifscCode: user.ifscCode || 'SHA123',
          balance: user.initialDeposit || 120,
          profilePicture: user.profileImage || 'assets/default-profile.PNG',
      });
  } else {
      // Redirect to login if the user is not authenticated
      res.redirect('/login');
  }
});

module.exports = router;
