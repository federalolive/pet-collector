const router = require("express").Router()
const commentsCtrl = require('../controllers/comments')

router.post("/:id/comments", isLoggedIn, commentsCtrl.create)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect("/auth/google")
}

module.exports = router