const router = require("express").Router()

router.get("/", function (req, res) {
  res.redirect('/pets')
})

module.exports = router
