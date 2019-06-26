const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../../models/Users.js");

// GET request ('/users')
// finds all users
router.get("/", (req, res) => {
  Users.find() // finds all documents of the Users Schema
    .sort({ date: -1 }) // sorts the array in descending order
    .then(users => res.json(users))
    .sendStatus(200) // if successful, promise returns array of users
    .catch(err => {
      res
        .json({
          Msg: "Error in finding users"
        })
        .sendStatus(500);
    });
});

// POST request ('/users')
// generates a new user with a hashed password
router.post("/", (req, res) => {
  const { email, password, username } = req.body; // destructure req body
  bcrypt
    .genSalt(10) // asynch func to generate salt rounds
    .then(salt => {
      bcrypt.hash(password, salt).then(hash => {
        // hashes the password with the generated salt
        if (hash) {
          const newUser = {
            email,
            password: hash,
            username
          };
          Users.create(newUser) // if successfully hashed password, creates a new user with the hashed password
            .then(user => {
              if (user) {
                res.json({
                  Msg: "Success in creating user"
                });
              }
            })
            // .sendStatus(201)
            .catch(err => {
              res.json({
                Msg: "Error in creating user"
              });
            })
            .sendStatus(500);
        }
      });
    })
    .catch(err => {
      res
        .json({
          Msg: "Error in generating salt"
        })
        .sendStatus(500);
    });
});

// POST request ('users/:id')
router.post("/login", (req, res) => {
  const { password, username } = req.body;
  // console.log(req.body);
  // user provides either username or email to login
  // criteria checks if the given info is a username or login
  var criteria =
    username.indexOf("@") === -1 ? { username } : { email: username };
  Users.findOne(criteria).then(user => {
    bcrypt.compare(password, user.password).then(user => {
      if (!user) {
        res.json({
          Msg: "Error, password does not match"
        });
      }
      jwt.sign(
        {
          data: "foobar"
        },
        process.env.jwtsecret,
        { expiresIn: "1h" },
        async (err, token) => {
          const jwttoken = await token;
          // console.log(jwttoken);
          res.json({
            token: jwttoken
          });
          if (!token || err) {
            res.json({
              Msg: "Error in generating token"
            });
          }
        }
      );
    });
  });
});

module.exports = router;
