const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.findAll = (req, res) => {
    User.find()
        .then(allUsers => res.json({ users: allUsers }))
        .catch(err => res.json({ message: "Something went wrong when finding all Users", error: err }))
}

module.exports.findOneUser = (req, res) => {
    User.findOne({ _id: req.params._id })
        .then(oneUser => res.json({ user: oneUser }))
        .catch(err => res.json({ message: "Something went wrong when finding one User", error: err }))
}

module.exports.createUser = (req, res) => {
    console.log('increateuser')
    User.create(req.body)
        .then(newUser => {
            const userToken = jwt.sign({
                id: newUser._id
            }, process.env.SECRET_KEY);

            res.cookie("usertoken", userToken, {httpOnly: true}).json({ success: 'success', user: (({ firstName, lastName, trees, mostID }) => ({ firstName, lastName, trees, mostID }))(newUser) });
        })
        .catch(err => res.json({ message: "Something went wrong when creating one User", error: err }))
}

module.exports.deleteUser = (req, res) => {
    User.findOneAndDelete({ _id: req.params._id })
        .then(() => res.json({ message: "Successfully Deleted" }))
        .catch(err => res.json({ message: "Something went wrong when deleting one User", error: err }))
}

module.exports.login = async (req, res) => {
    user = await User.findOne({ email: req.body.email })

    if (user === null) {
        res.json({ email: 'Your email does not match anything in our database' })
    }
    console.log(req.body.password, user.password)
    const correctPassword = await bcrypt.compare(req.body.password, user.password)

    if (!correctPassword) {
        res.json({ password: 'Your password does not match the given email' })
    }
    // console.log()
    const userToken = jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY)

    res.cookie('userToken', userToken, { httpOnly: true }).json({ message: 'Success', user: (({ firstName, lastName, trees, mostID }) => ({ firstName, lastName, trees, mostID }))(user) })
}

module.exports.logout = (req, res) => {
    res.clearCookie('userToken')
    res.sendStatus(200)
}

module.exports.addTreeToUser = (tree) => {
    User.findOneAndUpdate({_id: tree.user}, {$push: {trees: tree._id}})
        .then(console.log('success'))
        .catch(err=> console.log(err))
}