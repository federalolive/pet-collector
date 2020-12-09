const Pet = require('../models/pet')

module.exports = {
  create
}

function create(req, res) {
  // Find the pet via ._id (being passed in via req.params)
  Pet.findById(req.params.id)
  .then((pet) => {
    // Add postedBy to req.body BEFORE it is pushed into the embedded schema
    // This sets the postedBy property of the comment equal to the name of the logged in user
    req.body.postedBy = req.user.name
    pet.comments.push(req.body)
    pet.save(() => {
      res.redirect(`/pets/${pet._id}`)
    })
  })
}