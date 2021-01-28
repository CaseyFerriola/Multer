const User = require('../models/user.model')

module.exports.findAll = (req, res) => {
    User.find()
        .then(allUsers => res.json({users: allUsers}))
        .catch(err => res.json({message: "Something went wrong when finding all Users", error: err}))
}

module.exports.findOneUser = (req, res) => {
    User.findOne({_id: req.params._id})
        .then(oneUser => res.json({user: oneUser}))
        .catch(err => res.json({message: "Something went wrong when finding one User", error: err}))
}

module.exports.createUser = (req, res) => {
    User.create(req.body)
        .then(newUser => res.json({user: newUser}))
        .catch(err => res.json({message: "Something went wrong when creating one User", error: err}))
}