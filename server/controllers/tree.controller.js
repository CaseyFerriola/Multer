const Tree = require('../models/tree.model')
const multer = require('multer')
const { v4 } = require('uuid')
let path = require('path')
const router = require('express').Router();

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

module.exports.createTree = (req, res, next) => {
    console.log(req.file)

}






