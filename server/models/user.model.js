const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const emailValidators = [
    {
        validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email"
    },
    {
        validator: async function(email) {
            const user = await this.constructor.findOne({ email: email })
            console.log('Nope', user)
            if (user) {
                    return false
                } else {
                    return true
                }
        },
        message: "The specified email address is already in use"
    }
]
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "You must have a First Name"],
        minlength: [2, "The first name must be at lease 2 characters"]
    },
    lastName: {
        type: String,
        required: [true, "You must have a Last Name"],
        minlength: [2, "The last name must be at lease 2 characters"]
    },
    email: {
        type: String,
        required: [true, "You must have an email"],
        validate: emailValidators
    },
    trees: [String],
    mostID: {
        type: String,
        default: 'none'
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters']
    }

}, { timeStamps: true })

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);


UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        console.log("The passwords did not match")
        this.invalidate('confirmPassword', 'Password must match confirmation password');
    }
    next();
});


UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            console.log('hello from bcrypt')
            this.password = hash;
            next();
        });
});

const User = mongoose.model('user', UserSchema)


module.exports = User;