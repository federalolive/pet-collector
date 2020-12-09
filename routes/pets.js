const router = require("express").Router()
const petsCtrl = require('../controllers/pets')

router.get('/', petsCtrl.index)
router.get('/new', isLoggedIn, petsCtrl.new)
router.get('/:id', isLoggedIn, petsCtrl.show)
router.get('/:id/edit', isLoggedIn, petsCtrl.edit)
router.post('/', isLoggedIn, petsCtrl.create)
router.delete('/:id', isLoggedIn, petsCtrl.delete)
router.put('/:id', isLoggedIn, petsCtrl.update)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect("/auth/google")
}

module.exports = router