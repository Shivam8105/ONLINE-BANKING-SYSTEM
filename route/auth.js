const express = require('express');
const authConroller = require('../controllers/auth');

const router = express.Router();

router.post('/signup', authConroller.signup );

router.post('/login', authConroller.login);



module.exports = router;