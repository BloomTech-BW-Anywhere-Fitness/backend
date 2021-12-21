const router = require("express").Router();
const classDetails = require("./instructor-data");

router.get("/", (req, res) => {
  try {
    res.status(200).json(jokes);
    if (!token) {
      next({ status: 401, message: "you are unauthorized" });
    }
  } catch (err) {
    next({  message: "you are unauthorized" });
  }
});

router.post("/", (req, res) => {
    try {
      res.status(200).json(jokes);
      if (!token) {
        next({ status: 401, message: "you are unauthorized" });
      }
    } catch (err) {
      next({  message: "you are unauthorized" });
    }
  });
module.exports = router;
