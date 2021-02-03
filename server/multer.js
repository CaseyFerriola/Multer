
const multer = require('multer')    
let path = require('path')
const TreeController = require('./controllers/tree.controller')

var treeImageFields = [{name: 'wholeTree', maxCount: 1}, {name: 'leaf', maxCount: 1}, {name: 'trunk', maxCount: 1}, {name: 'fruit', maxCount: 1}, {name: 'bud', maxCount: 1}]

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, `server/images/${file.fieldname}/`)
    },
    filename: function (req, file, cb) {
        cb(null, req.body.genus + '-' + req.body.species + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({ //multer settings
    storage: storage,
    fileFilter: function (req, file, cb) {
        // console.log("Inside the filter", file)
        if(file.mimetype !== 'image/jpeg') {
            return cb(new Error("File is not an image"))
        }
        cb(null, true)
    }
}).fields(treeImageFields)

const treeImageHandler = (req, res) => {
    upload(req, res, (err) => {
        // console.log(req.body.lat, 'hello')
        let errors = {}
        if(err || !req.files.wholeTree || !req.files.leaf || !req.files.trunk || !req.files.fruit || !req.files.bud || !req.body.genus == null || !req.body.lat){
            console.log("in error section")
            if(req.body.genus == null){
                errors.genus = "You must have a Scientific Name"
            }
            if(!req.body.lat){
                errors.location = "Please click the tree's location on the map"
            }
            if(!req.files.wholeTree || err){
                errors.wholeTree = ' Whole Tree, '
            }
            if(!req.files.leaf || err){
                errors.leaf = ' Leaf, '
            }
            if(!req.files.trunk || err){
                errors.trunk = ' Trunk, '
            }
            if(!req.files.fruit || err){
                errors.fruit = ' Fruit, '
            }
            if(!req.files.bud || err){
                errors.bud = ' Bud '
            }
            return res.json(errors) 
        } else{
            console.log("in sucess section")
            TreeController.createTree(req, res)
        } 
    })
}

module.exports = treeImageHandler