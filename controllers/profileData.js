const mysql = require("mysql");
const bcrypt = require('bcryptjs');
const session = require('express-session');
const multer = require('multer'); // Import multer for file handling
const jwt = require('jsonwebtoken'); 





// Database connection setup
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD || null,
  database: process.env.DATABASE
});

// Check if database connection is successful
db.connect((err) => {
  if (err) {
    console.log('Error connecting to the database:', err);
  } else {
    console.log('Database connected successfully');
  }
});






// View Profile
// View Profile
// View Profile
exports.profile = (req, res) => {
  const userId = req.session.user ? req.session.userId : null;

  if (!userId) {
    return res.status(401).json({ error: 'User not logged in. Please log in first.' });
  }

  const query = 'SELECT * FROM usersignup WHERE userId = ?';
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Error fetching user profile:', err.message);
      return res.status(500).json({ error: 'Error fetching profile data. Please try again later.' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const userProfile = result[0];
    res.render('profile', {
      // username: userProfile.firstName && userProfile.lastName 
      //             ? `${userProfile.firstName} ${userProfile.lastName}` 
      //             : 'User',
      // profilePicture: userProfile.profilePicture || '/assets/default-profile.PNG',
      // firstName: userProfile.firstName || 'Not specified',
      // lastName: userProfile.lastName || 'Not specified',
      // email: userProfile.email || 'Not provided',
      // phone: userProfile.phone || 'Not provided',
      // gender: userProfile.gender || 'Not specified',
      // DOB: userProfile.DOB || 'Not specified',
      // initialDeposit: userProfile.initialDeposit || 120,
      accountNumber: userProfile.userId,
      ifscCode: 'XYZ123',
      balance: userProfile.balance || 0
    });
  });
};

// Handle profile image update
exports.updateProfileImage = (req, res) => {
  const userId = req.session.user ? req.session.user.id : null;

  if (!userId) {
    return res.redirect('/login');
  }

  if (!req.file) {
    return res.status(400).send({ error: 'No file uploaded.' });
  }

  const imagePath = '/uploads/profiles/' + req.file.filename;
  db.query('UPDATE usersignup SET profileImage = ? WHERE userId = ?', [imagePath, userId], (err) => {
    if (err) {
      console.error('Error updating profile image:', err);
      return res.status(500).send({ error: 'Error updating profile image. Please try again later.' });
    }

    res.redirect('/profile');
  });
};


// Update Phone and Address
exports.updateProfile = (req, res) => {
  const { phone, address } = req.body;
  const userId = req.session.user ? req.session.user.id : null;

  if (!userId) {
    return res.redirect('/login');
  }

  if (!phone || !address) {
    return res.status(400).send({ error: 'Phone and address are required.' });
  }

  db.query('UPDATE bank_accounts SET phone = ?, address = ? WHERE userId = ?', [phone, address, userId], (err, result) => {
    if (err) {
      console.error('Error updating profile:', err);
      return res.status(500).send({ error: 'Error updating profile. Please try again later.' });
    }

    res.redirect('/profile');
  });
};

// Deposit Money
exports.deposit = (req, res) => {
  const { amount } = req.body;
  const userId = req.session.user ? req.session.user.id : null;

  if (!userId) {
    return res.redirect('/login');
  }

  if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
    return res.status(400).send({ error: 'Invalid deposit amount.' });
  }

  db.query('SELECT initialDeposit FROM usersignup WHERE userId = ?', [userId], (err, result) => {
    if (err) {
      console.error('Error fetching balance:', err);
      return res.status(500).send({ error: 'Error processing deposit request. Please try again later.' });
    }

    const currentBalance = result[0].currentBalance;
    const newBalance = parseFloat(currentBalance) + parseFloat(amount);

    db.query('UPDATE usersignup SET initialDeposit = ? WHERE userId = ?', [newBalance, userId], (err) => {
      if (err) {
        console.error('Error updating balance:', err);
        return res.status(500).send({ error: 'Error updating balance. Please try again later.' });
      }

      db.query('INSERT INTO transactions SET ?', {
        userId: userId,
        type: 'credit',
        amount: amount,
        description: 'Deposit'
      }, (err) => {
        if (err) {
          console.error('Error logging transaction:', err);
          return res.status(500).send({ error: 'Error logging transaction. Please try again later.' });
        }

        res.redirect('/profile');
      });
    });
  });
};

// Withdraw Money
exports.withdraw = (req, res) => {
  const { amount } = req.body;
  const userId = req.session.user ? req.session.user.id : null;

  if (!userId) {
    return res.redirect('/login');
  }

  if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
    return res.status(400).send({ error: 'Invalid withdrawal amount.' });
  }

  db.query('SELECT initialDeposit FROM usersignup WHERE userId = ?', [userId], (err, result) => {
    if (err) {
      console.error('Error fetching balance:', err);
      return res.status(500).send({ error: 'Error processing withdrawal request. Please try again later.' });
    }

    const balance = result[0].balance;

    if (parseFloat(amount) > parseFloat(balance)) {
      return res.status(400).send({ error: 'Insufficient balance.' });
    }

    const newBalance = parseFloat(balance) - parseFloat(amount);

    db.query('UPDATE usersignup SET currentBalance = ? WHERE userId = ?', [newBalance, userId], (err) => {
      if (err) {
        console.error('Error updating balance:', err);
        return res.status(500).send({ error: 'Error updating balance. Please try again later.' });
      }

      db.query('INSERT INTO transactions SET ?', {
        userId: userId,
        type: 'debit',
        amount: amount,
        description: 'Withdrawal'
      }, (err) => {
        if (err) {
          console.error('Error logging transaction:', err);
          return res.status(500).send({ error: 'Error logging transaction. Please try again later.' });
        }

        res.redirect('/profile');
      });
    });
  });
};

// View Transaction History
exports.viewTransactions = (req, res) => {
  const userId = req.session.user ? req.session.user.id : null;

  if (!userId) {
    return res.redirect('/login');
  }

  db.query('SELECT * FROM transactions WHERE userId = ? ORDER BY createdAt DESC', [userId], (err, result) => {
    if (err) {
      console.error('Error fetching transactions:', err);
      return res.status(500).send({ error: 'Error fetching transactions. Please try again later.' });
    }

    if (result.length === 0) {
      return res.status(404).send({ error: 'No transactions found.' });
    }

    res.render('transactions', { transactions: result });
  });
};


// Set up multer for profile image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profiles/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Route to handle profile image upload
exports.uploadProfileImage = upload.single('profileImage'); // 'profileImage' is the name of the input in the form

// Handle profile image update
exports.updateProfileImage = (req, res) => {
  const userId = req.session.user ? req.session.user.id : null;

  if (!userId) {
    return res.redirect('/login');
  }

  if (!req.file) {
    return res.status(400).send({ error: 'No file uploaded.' });
  }

  const imagePath = '/uploads/profiles/' + req.file.filename;
  db.query('UPDATE usersignup SET profileImage = ? WHERE userId = ?', [imagePath, userId], (err) => {
    if (err) {
      console.error('Error updating profile image:', err);
      return res.status(500).send({ error: 'Error updating profile image. Please try again later.' });
    }

    res.redirect('/profile');
  });
};

