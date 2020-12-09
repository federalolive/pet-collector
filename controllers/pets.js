const Pet = require('../models/pet')
const User = require('../models/user')

module.exports = {
  index,
  show,
  new: newPet,
  delete: deletePet,
  update,
  create,
  edit
}

function index(req, res) {
  Pet.find({})
  .populate('owner')
  .then((pets) => {
    res.render('pets/index', {user: req.user, pets})
  })
}

function create(req, res) {
  req.body.owner = req.user._id
  Pet.create(req.body)
  .then(() => {
    res.redirect('/pets')
  })
}

function show(req, res) {
  Pet.findById(req.params.id)
  .populate('owner')
  .then((pet) => {
    res.render('pets/show', {user: req.user, pet})
  })
}

function newPet(req, res) {
  res.render('pets/new', {user: req.user})
}

function deletePet(req, res) {
  Pet.findByIdAndDelete(req.params.id)
  .then(() => {
    res.redirect('/pets')
  })
}

function update(req, res) {
  req.body.owner = req.user._id
  Pet.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then((pet) => {
    res.redirect(`/pets/${pet._id}`)
  })
}

function edit(req, res) {
  Pet.findById(req.params.id)
  .then((pet) => {
    res.render('pets/edit', {user: req.user, pet})
  })
}