const Tree = require('../models/tree.model')
const UserController = require('./user.controller')
module.exports.findAll = (req, res) => {
    Tree.find()
        .then(allTrees => res.json({ trees: allTrees }))
        .catch(err => res.json({ message: "Something went wrong when finding all trees", error: err }))
}

module.exports.findOneTree = (req, res) => {
    Tree.findOne({ _id: req.params._id })
        .then(oneTree => res.json({ tree: oneTree }))
        .catch(err => res.json({ message: "Something went wrong when finding one tree", error: err }))
}

module.exports.createTree = (req, res) => {
    console.log("****************************************************************************")
    // console.log(req.body)
    // console.log(req.files.wholeTree[0].filename)
    const newTreeData = {
        genus: req.body.genus,
        species: req.body.species,
        commonName: req.body.commonName,
        habitat: req.body.habitat,
        user: req.body.user,
        location: {lat: req.body.lat, lng: req.body.lng},
        wholeTree: req.files.wholeTree[0].filename,
        leaf: req.files.leaf[0].filename,
        trunk: req.files.trunk[0].filename,
        fruit: req.files.fruit[0].filename,
        bud: req.files.bud[0].filename
    }
    Tree.create(newTreeData)
        .then(newTree => {
            // console.log('Tree Created', newTree)
            UserController.addTreeToUser(newTree)
            // let newUser = UserController.findUserFromTree(newTree.user)
            // console.log(newUser)
            res.json({tree: newTree})
        })
        .catch(err => res.json({message: "Something went wrong when creating a tree", error: err}))

}

module.exports.deleteTree = (req, res) => {
    Tree.findOneAndDelete({_id: req.params._id})
        .then(() => res.json("The tree was successfully deleted"))
        .catch(err => res.json({message: "Something went wrong when deleting a tree", error: err}))
}






