const Pet = require('../models/pet')
const User = require('../models/user')

module.exports = {
  index,
  show,
  new: newPet,
  delete: deletePet,
  update,
  create,
  edit,
  indexMine
}

// Find all the pet documents and pass them to the index page
function index(req, res) {
  Pet.find({})
  // Populate the owner field (turning each ObjectId into the document it references)
  .populate('owner')
  .then((pets) => {
    res.render('pets/index', {user: req.user, pets})
  })
}

// Create a new pet document
function create(req, res) {
  // Assign the _id of the current logged in user to req.body.owner BEFORE creating
  req.body.owner = req.user._id
  Pet.create(req.body)
  .then(() => {
    res.redirect('/pets')
  })
}

// Find the pet document using the _id being passed in via req.params
function show(req, res) {
  Pet.findById(req.params.id)
  // Populate the owner field (turning each ObjectId into the document it references)
  .populate('owner')
  .then((pet) => {
    res.render('pets/show', {user: req.user, pet})
  })
}

// Render a view for adding a new pet
function newPet(req, res) {
  res.render('pets/new', {user: req.user})
}

// Find the pet by ._id (being passed in via req.params) and delete it
function deletePet(req, res) {
  Pet.findByIdAndDelete(req.params.id)
  .then(() => {
    res.redirect('/pets')
  })
}

// Find the pet by ._id (being passed in via req.params) and update it
function update(req, res) {
  // Assign the _id of the current logged in user to req.body.owner BEFORE updating
  req.body.owner = req.user._id
  // findByIdAndUpdate requires 3 arguments (the thing to update, what to update it with, and {new: true})
  Pet.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then((pet) => {
    res.redirect(`/pets/${pet._id}`)
  })
}

// Find the pet by ._id (being passed in via req.params) and pass it to the edit view
function edit(req, res) {
  Pet.findById(req.params.id)
  .then((pet) => {
    res.render('pets/edit', {user: req.user, pet})
  })
}

// Find all pet documents belonging to the current logged in user
function indexMine(req, res) {
  Pet.find({ owner: req.user._id })
  .populate('owner')
  .then((pets) => {
    res.render('pets/index', {pets, user: req.user})
  })
}