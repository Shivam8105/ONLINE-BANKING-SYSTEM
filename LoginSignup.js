const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");
const session = require("express-session");

dotenv.config(); // Load environment variables

const app = express();

// Database connection
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD || null,
  database: process.env.DATABASE
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
  } else {
    console.log("MySQL connected...");
  }
});

// Middleware setup
const publicDirectory = path.join(__dirname, './frontend');
const assetsDirectory = path.join(__dirname, './assets');

app.use(express.static(publicDirectory)); // Serve frontend static files
app.use('/assets', express.static(assetsDirectory)); // Serve assets
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET, // Secret for signing the session ID cookie
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// View engine setup
app.set('view engine', 'hbs');

// Middleware for session user access in views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Define routes
app.use('/', require('./route/pages')); // General pages (e.g., login, signup)
app.use('/auth', require('./route/auth')); // Authentication routes
app.use('/profile', require('./route/auth')); // Profile-related routes

// Start the server
const PORT = 5004;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
