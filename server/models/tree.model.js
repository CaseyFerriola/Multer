const mongoose = require('mongoose')

const TreeSchema = new mongoose.Schema({
    genus: {
        type: String, 
        required: [true, "You must have a genus"]
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
    wholeTree: {
        type: String
    },
    // leaf: {
    //     type: String
    // },
    // trunk: {
    //     type: String
    // },
    // fruit: {
    //     type: String
    // },
    // bud: {
    //     type: String
    // }
})

const Tree = mongoose.model('tree', TreeSchema)

module.exports = Tree