const Pet = require('../models/pet')

module.exports = {
  create
}

function create(req, res) {
  Pet.findById(req.params.id)
  .then((pet) => {
    req.body.postedBy = req.user.name
    pet.comments.push(req.body)
    pet.save(() => {
      res.redirect(`/pets/${pet._id}`)
    })
  })
}