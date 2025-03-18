// controllers/HomeController.js
const db = require('../config');  // Import the DB connection
const session = require("express-session");
const multer = require('multer');
const path = require('path');

// Configure multer storage and file naming
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save uploaded files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name based on timestamp
  }
});

// Initialize multer with the defined storage
const upload = multer({ storage: storage });

class HomeController {
  // Register a new user
  async registerUser(req, res) {
    const { name, email,phone, password ,userrole } = req.body;
    const user_profile = req.file ? req.file.path.replace(/\\/g, "/") : null; // Normalize file path for compatibility

    try {
      console.log(user_profile);
      // Check if the user already exists
      const [existingUser] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
      if (existingUser.length > 0) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // Register the new user
      const [result] = await db.execute(
        'INSERT INTO users (name, email,phone_no, password,user_role) VALUES (?,?,?,?,?)',
        [name, email,phone, password,userrole]
      );

      res.status(201).json({ msg: 'User registered successfully', userId: result.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  }
  //login user
  async loginuser(req, res) {
    const { email, password } = req.body;
  
    try {
     
      if (!email || !password) {
        return res.status(400).json({ msg: 'Email and password are required' });
      }
      // Check if the user exists in the database
      const [validateuser] = await db.execute('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
  
      if (validateuser.length <= 0) {
        // If no user found, return an error
        return res.status(400).json({ msg: 'User does not exist or invalid credentials' });
      }

      // req.session.cookie.user = { name: validateuser[0].name, userid: validateuser[0].id, userrole: validateuser[0].userrole}
      // req.session.testing = "helloworld";

      // If user found, return the user data (be careful not to expose sensitive data like password)
      console.log(validateuser);
  
      res.status(200).json({ msg: 'User logged in successfully', userdata: validateuser[0] });
    } catch (error) {
      console.error(error);
      // Send back a more detailed error message
      res.status(500).json({ msg: 'Server error', error: error.message, stack: error.stack });    }
  }
  
  // Get all users
  async getAllUsers(req, res) {
    try {
      const [rows] = await db.execute('SELECT * FROM users');
      res.json(rows);  // Send back an array of users
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  }
  // Get all owner
  async getowners(req, res) {
    try {
      const [rows] = await db.execute('SELECT * FROM users where user_role=2');
      res.json(rows);  // Send back an array of users
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  }
   // Get all developer
   async getdeveloper(req, res) {
    try {
      const [rows] = await db.execute('SELECT * FROM users where user_role=3');
      res.json(rows);  // Send back an array of users
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  }
}

module.exports = new HomeController();
