const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../../models/Users.js");
const auth = require("../../middleware/auth.js");

// GET request ('/users')
// finds all users
router.get("/", (req, res) => {
  Users.find() // finds all documents of the Users Schema
    .sort({ date: -1 }) // sorts the array in descending order
    .then(users => res.status(200).json(users))
    // if successful, promise returns array of users
    .catch(err => {
      res.sendStatus(500).json({
        Msg: "Error in finding users"
      });
    });
});

// POST request ('/users')
// generates a new user with a hashed password
router.post("/", (req, res) => {
  const { name, email, password, username } = req.body; // destructure req body

  // checks if any field is missing
  if (!name || !email || !password || !username) {
    res.status(400).json({
      Msg: "Please enter signup fields"
    });
  }

  // determines if there is already a user with that email
  Users.findOne({ email }).then(user => {
    if (user) {
      res.status(400).json({
        msg: "User with this email already exists"
      });
    }

    bcrypt
      .genSalt(10) // asynch func to generate salt rounds
      .then(salt => {
        bcrypt.hash(password, salt).then(hash => {
          // hashes the password with the generated salt
          console.log(hash);
          if (hash) {
            const newUser = {
              name,
              email,
              password: hash,
              username
            };
            Users.create(newUser) // if successfully hashed password, creates a new user with the hashed password
              .then(user => {
                const { name, username, email, password, _id } = user;
                // puts user id into the payload of the jwt
                jwt.sign(
                  { id: _id },
                  process.env.jwtsecret,
                  { expiresIn: "1h" },
                  (err, token) => {
                    console.log(token);
                    if (err) throw err;
                    res.status(201).json({
                      token,
                      user: {
                        _id,
                        name,
                        username,
                        email,
                        password
                      }
                    });
                  }
                );
              })
              .catch(err => {
                res.status(500).json({
                  Msg: "Error in creating user"
                });
              });
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          Msg: "Error in generating salt"
        });
      });
  });
});

// POST request ('users/:id')
// Logs a user in
router.post("/login", (req, res) => {
  // destructure the request body object
  const { password, username } = req.body;

  // user provides either username or email to login
  // criteria checks if the given info is a username or login
  var criteria =
    username.indexOf("@") === -1 ? { username } : { email: username };
  Users.findOne(criteria).then(user => {
    // throws an error if user does not exist
    if (!user) throw err;
    // if user exists, compares the given pw to the hashed pw
    bcrypt.compare(password, user.password).then(match => {
      if (!match) {
        res.status(400).json({
          Msg: "Error, password does not match"
        });
      }
      // if passwords match, signs a jwt returns it with the user
      jwt.sign(
        { id: user._id },
        process.env.jwtsecret,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) throw err;
          res.status(201).json({
            token,
            user: {
              id: user._id,
              name: user.name,
              username: user.username,
              email: user.email,
              password: user.password
            }
          });
        }
      );
    });
  });
});

// GET request route '/users/user'
// returns the user who has the given token
router.get("/user", auth, (req, res) => {
  Users.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;
