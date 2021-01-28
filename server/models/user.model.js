const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    tag: {
        type: String,
        required: [true, "You must have a tag"],
        minlength: [2, "The tag must be at lease 2 characters"]
    },
    email: {
        type: String,
        required: [true, "You must have an email"]
    },
    trees: [String],
    mostID: {
        type: String,
        default: 'none'
    }
})

const User = mongoose.model('user', UserSchema)

module.exports = User;