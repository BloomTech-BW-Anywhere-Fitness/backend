// Require `checkUsernameFree`, `checkUsernameExists` and `checkPasswordLength`
// middleware functions from `auth-middleware.js`. You will need them here!
const router = require("express").Router();
const { tokenBuilder } = require('./auth-helpers')
const bcrypt = require("bcryptjs");
const User = require("../client/users-model");
const {
 
  checkPasswordLength,
  checkUsernameExists,
  checkUsernameFree,
} = require("./auth-middleware");
/**
  1 [POST] /api/auth/register { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "user_id": 2,
    "username": "sue"
  }

  response on username taken:
  status 422
  {
    "message": "Username taken"
  }

  response on password three chars or less:
  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
 */
router.post(
  "/register",
  checkPasswordLength,
  checkUsernameFree,
  (req, res, next) => {
    const { username, password } = req.body;
    const hash = bcrypt.hashSync(password, 8); //

    User.add({ username, password: hash })
      .then((saved) => {
        res.status(201).json(saved);
      })

      .catch(next);
  }
);
/**
  2 [POST] /api/auth/login { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "message": "Welcome sue!"
  }

  response on invalid credentials:
  status 401
  {
    "message": "Invalid credentials"
  }
 */
  router.post('/login', (req, res, next) => {
    let { username, password } = req.body
  
    User.findBy({ username })
      .then(([user]) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          // here we make this thing called token
          // it's just a string that's just as good as valid credentials
          const token = tokenBuilder(user)
          res.status(200).json({
            message: `Welcome back ${user.username}...`,
            token,
            role: user.role
          })
        } else {
          next({ status: 401, message: 'Invalid Credentials' })
        }
      })
      .catch(next)
  })
/**
  3 [GET] /api/auth/logout

  response for logged-in users:
  status 200
  {
    "message": "logged out"
  }

  response for not-logged-in users:
  status 200
  {
    "message": "no session"
  }
 */

router.get("/logout", (req, res, next) => {
  res.json("logout");
});

// Don't forget to add the router to the `exports` object so it can be required in other modules
module.exports = router;
