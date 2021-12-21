const User = require("../client/users-model");

/*
  If the user does not have a session saved in the server

  status 401
  {
    "message": "You shall not pass!"
  }
*/
function restricted(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return next({ 
      status: 401, 
      message: "we want a token" 
    });
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return next({ 
        status: 401, 
        message: `your token sucks: ${err.message}` 
      });
    }
    req.decodedJwt = decoded;
    next();
  });
}

// AUTHORIZATION
const checkRole = (role) => (req, res, next) => {
  if (req.decodedJwt.role === role) {
    next();
  } else {
    next({ status: 403, message: "you have no power here!" });
  }
};
/*
  If the username in req.body already exists in the database

  status 422
  {
    "message": "Username taken"
  }
*/
async function checkUsernameFree(req, res, next) {
  try {
    const users = await User.findBy({ username: req.body.username });
    if (!users.length) {
      next();
    } else {
      next({ message: "Username taken", status: 422 });
    }
  } catch (err) {
    next(err);
  }
}

/*
  If the username in req.body does NOT exist in the database

  status 401
  {
    "message": "Invalid credentials"
  }
*/
async function checkUsernameExists(req, res, next) {
  try {
    const users = await User.findBy({ username: req.body.username });
    console.log({ users });
    if (!users.length) {
      req.user = users[0];
      next();
    } else {
      next({ message: "Invalid credentials", status: 401 });
    }
  } catch (err) {
    next(err);
  }
}

/*
  If password is missing from req.body, or if it's 3 chars or shorter

  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
*/
function checkPasswordLength(req, res, next) {
  if (!req.body.password || req.body.password.length < 3) {
    next({ message: "Password must be longer than 3 chars", status: 422 });
  } else {
    next();
  }
}

/////////////CLASS/////////////

async function checkClassExists(req, res, next) {
  const possibleClass = await Classes.getClassById(req.params.id)
  if (!possibleClass) {
      next({ status: 401, message: 'that class does not exist'})
  } else {
      next()
  }
}

async function validateClass(req, res, next) {
  const { 
      name,
      instructor_username,
      type,
      start_time,
      duration,
      intensity,
      location,
      class_size
  } = req.body
  if (!name) {
      next({
          status: 400,
          message: "name required"
      })
  } else {
      next()
  }

  if (!instructor_username) {
      next({
          status: 400,
          message: "instructor's name required"
      })
  } else {
      next()
  }

  if (!start_time) {
      next({
          status: 400,
          message: "start time required"
      })
  } else {
      next()
  }

  if (!duration) {
      next({
          status: 400,
          message: "duration required"
      })
  } else {
      next()
  }

  if (!intensity) {
      next({
          status: 400,
          message: "intensity required"
      })
  } else {
      next()
  }

  if (!location) {
      next({
          status: 400,
          message: "location required"
      })
  } else {
      next()
  }

  if (!class_size) {
      next({
          status: 400,
          message: "class size required"
      })
  } else {
      next()
  }

}
// Don't forget to add these to the `exports` object so they can be required in other modules
module.exports = {
  checkRole,
  restricted,
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength,
  checkClassExists,
  validateClass
};
