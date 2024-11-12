const express = require('express');


const router = express.Router();

router.get('/', (req, res) => {
  res.render('dashboard')
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;