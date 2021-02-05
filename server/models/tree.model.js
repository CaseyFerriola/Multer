
const mongoose = require('mongoose')

const TreeSchema = new mongoose.Schema({
    genus: {
        type: String
    },
    species: {
        type: String
    },
    commonName: {
        type: String
    },
    habitat: {
        type: String
    },
    user: {
        type: String
    },
    location: {
        type: Object
    },
    wholeTree: {
        type: String
    },
    leaf: {
        type: String
    },
    trunk: {
        type: String
    },
    fruit: {
        type: String
    },
    bud: {
        type: String
    }
}, {timestamps: true})

const Tree = mongoose.model('tree', TreeSchema)

module.exports = Tree