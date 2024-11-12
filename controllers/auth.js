const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD || null,
  database: process.env.DATABASE
});

// Sign up function
exports.signup = (req, res) => {
  const { firstname, lastname, dob, Email, password, passwordConfirm } = req.body;

  db.query('SELECT Email FROM usersignup WHERE Email = ?', [Email], async (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.length > 0) {
      return res.render('signup', {
        message: 'That email is already in use'
      });
    } else if (password !== passwordConfirm) {
      return res.render('signup', {
        message: 'Passwords do not match'
      });
    }

    let hashedPassword = await bcrypt.hash(password, 8);

    db.query('INSERT INTO usersignup SET ?', {
      firstname: firstname,
      lastname: lastname,
      dob: dob,
      Email: Email,
      password: hashedPassword
    }, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.render('login', {
          message: 'User registered, please log in'
        });
      }
    });
  });
};

// Login function
exports.login = (req, res) => {
  const { Email, password } = req.body;

  db.query('SELECT * FROM usersignup WHERE Email = ?', [Email], async (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Server error");
    }

    if (result.length === 0) {
      return res.render('login', {
        message: 'You are not registered'
      });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.render('login', {
        message: 'Incorrect password'
      });
    }

    // If password matches, log the user in
    req.session.user = user;  // Assuming you’re using express-session for session management
    res.redirect('/dashboard'); // Redirect to homepage or another route
  });
};
