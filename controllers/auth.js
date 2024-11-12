const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD  || null,
  database: process.env.DATABASE
});




exports.signup =(req, res) => {
  console.log(req.body);
  // const firstname = req.body.firstName;
  // const lastname = req.body.lastName;
  // const dob = req.body.dob;
  // const email = req.body.email;
  // const password = req.body.password;
  // const passwordConfirm = req.body.passwordConfirm;

  const {firstname, lastname, dob, Email, password, passwordConfirm} = req.body;

  db.query('SELECT email FROM usersignup WHERE Email =?', [Email], async (err, result) => {
     if(err){
      console.log(err)
     } if(result.length > 0){
       return res.render('signup', {
        message: 'That email is already in use'
       })
     } else if ( password !== passwordConfirm){
      return res.render('signup', {
        message: 'password do not match'
      });
     }

     let hashedPassowrd = await bcrypt.hash(password, 8);
     console.log(hashedPassowrd);

     res.send("testing");


  });



 
}