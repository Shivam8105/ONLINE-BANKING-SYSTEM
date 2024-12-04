const mysql = require("mysql");
const bcrypt = require('bcryptjs');
const multer = require('multer');
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

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Middleware to verify JWT token
function isTokenValid(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized. Please log in.' });
  }

  // Verify the token using JWT secret
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: 'Invalid or expired token. Please log in again.' });
    }

    req.user = decoded; // Attach decoded user info to the request object
    next(); // Proceed to the next middleware or route handler
  });
}


// Sign up function
exports.signup = (req, res) => {
  const { firstname, lastname, dob, email, phone, gender, password, passwordConfirm, initialDeposit } = req.body;

  // Check for missing fields
  if (!firstname || !lastname || !dob || !email || !phone || !gender || !password || !passwordConfirm || !initialDeposit) {
    return res.render('signup', {
      message: 'All fields are required.' // Display message without redirecting
    });
  }

  db.query('SELECT email FROM usersignup WHERE email = ?', [email], async (err, result) => {
    if (err) {
      console.log('Database error during signup:', err);
      return res.render('signup', {
        message: 'Database error. Please try again later.' // Display message without redirecting
      });
    }

    if (result.length > 0) {
      return res.render('signup', {
        message: 'That email is already in use' // Display message without redirecting
      });
    } else if (password !== passwordConfirm) {
      return res.render('signup', {
        message: 'Passwords do not match' // Display message without redirecting
      });
    }

    // Hash the password
    let hashedPassword = await bcrypt.hash(password, 8);

    // Log values to see if everything is coming correctly from the form
    console.log('Inserting values into the database:', {
      firstname, lastname, dob, email, phone, gender, hashedPassword, initialDeposit
    });

    db.query('INSERT INTO usersignup SET ?', {
      firstName: firstname,
      lastName: lastname,
      dob: dob,
      email: email,
      phone: phone,
      gender: gender,
      password: hashedPassword,
      initialDeposit: initialDeposit
    }, (err, result) => {
      if (err) {
        console.error('Error during registration:', err);
        return res.render('signup', {
          message: 'Registration failed. Please try again later.' // Display message without redirecting
        });
      } else {
        console.log(result); // Log the result of the insert query
        console.log('Warning count:', result.warningCount);
        console.log('User registered successfully:', result);
        return res.render('login', {
          message: 'You are registered, please log in.' // Display success message without redirecting
          
        });
      }
    });
  });
};

// Login function
exports.login = (req, res) => {
  const { email, password } = req.body;

  // Validate input fields
  if (!email || !password) {
    return res.status(400).json({
      message: 'Please enter both email and password.' // Send error message in JSON format
    });
  }

  // Query the database for the user with the provided email
  db.query('SELECT * FROM usersignup WHERE email = ?', [email], async (err, result) => {
    if (err) {
      console.log('Database error during login:', err);
      return res.status(500).json({
        message: 'Database error during login.' // Ensure error message is in JSON format
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: 'No user found with this email.' // Return JSON if no user found
      });
    }

    const user = result[0];

    // Compare the password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'Incorrect password.' // Return JSON for incorrect password
      });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h', // The token expires in 1 hour
    });

    console.log(token);

    // Store user information in the session
    req.session.user = {
      userId: user.userId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      DOB: user.DOB,
      gender: user.gender,
      phone: user.phone,
      initialDeposit: user.initialDeposit,
    };

    console.log('log data: ',req.session.user); // Check if userId is stored correctly


    

    // Send the token to the client as part of the response
    res.status(200).json({
      message: 'Login successful!',
      token: token,  // Send the token to the client
    });
  });
};



exports.viewProfile = (req, res) => {
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
      username: userProfile.firstName && userProfile.lastName 
                  ? `${userProfile.firstName} ${userProfile.lastName}` 
                  : 'User',
      profilePicture: userProfile.profilePicture || '/assets/default-profile.PNG',
      firstName: userProfile.firstName || 'Not specified',
      lastName: userProfile.lastName || 'Not specified',
      email: userProfile.email || 'Not provided',
      phone: userProfile.phone || 'Not provided',
      gender: userProfile.gender || 'Not specified',
      DOB: userProfile.DOB || 'Not specified',
      initialDeposit: userProfile.initialDeposit || 0,
      accountNumber: userProfile.userId,
      ifscCode: 'XYZ123',
      balance: userProfile.balance || 0
    });
  });
};


// Open new bank account (transaction) function
exports.openAccount = [
  isTokenValid, // Middleware to check if the user is logged in with a valid token
  (req, res) => {
    upload.single('profilePicture')(req, res, (err) => {
      if (err) {
        console.error('File upload error:', err);
        return res.status(400).json({ message: 'Error uploading file. Please try again.' });
      }

      const { fullName, email, phone, address, accountType, initialDeposit, dateOfBirth, gender, password } = req.body;

      // Validate required fields
      if (!accountType || !initialDeposit || !phone || !address || !fullName || !dateOfBirth || !gender || !password) {
        return res.status(400).json({ message: 'Account Type, Initial Deposit, Phone, Address, Full Name, Date of Birth, Gender, and Password are required.' });
      }

      // Validate initial deposit
      if (isNaN(initialDeposit) || initialDeposit <= 0) {
        return res.status(400).json({ message: 'Initial deposit must be a positive number.' });
      }

      // Hash the password
      const hashedPassword = bcrypt.hashSync(password, 8);

      // Define the query to insert the new account
      const query = 'INSERT INTO bank_accounts (FULLNAME, EMAIL, PHONENUMBER, ADDRESS, ACCOUNTTYPE, INITIALDEPOSIT, DATEOFBIRTH, GENDER, PROFILEPICTURE, PASSWORD, IFSC_CODE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

      // Insert the new account data into the database
      db.query(query, [fullName, email, phone, address, accountType, initialDeposit, dateOfBirth, gender, req.file ? req.file.filename : null, hashedPassword, 'ShadilBank12'], (err, result) => {
        if (err) {
          console.error('Database error:', err); // Log full error
          return res.status(500).json({ message: 'Error processing your request. Please try again later.' });
        }

        // Assuming the user is logged in and we can fetch their info using the email or other identifier.
        db.query('SELECT * FROM bank_accounts WHERE EMAIL = ?', [email], (err, userResult) => {
          if (err) {
            console.error('Error fetching user data:', err);
            return res.status(500).json({ message: 'Error fetching user data. Please try again later.' });
          }

          if (userResult.length > 0) {
            // Assuming the user data exists, we can redirect to the profile page
            req.session.user = userResult[0];  // Store user data in session (if using session management)

            // Redirect to the profile page
            return res.redirect('/profile');
          } else {
            return res.status(404).json({ message: 'User not found after account creation.' });
          }
        });
      });
    });
  }
];

// Profile function (fetch user details for profile page)
// Profile function (fetch user details for profile page)
