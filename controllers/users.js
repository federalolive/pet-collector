const User = require('../models/user')
const Pet = require('../models/pet')

module.exports = {
  index,
  show
}

// Find ALL user documents and pass them to the index view
function index(req, res) {
  User.find({})
  .then((users) => {
    res.render("users/index", {users, user: req.user})
  })
}

// Find the selected user document and pass it to the show 
function show(req, res) {
  User.findById(req.params.id)
  .then((user) => {
    // Find the pets that belong to the user document 
    Pet.find({ owner: user._id })
    .then((pets) => {
      res.render("users/show", {user: req.user, pets})
    })
  })
}