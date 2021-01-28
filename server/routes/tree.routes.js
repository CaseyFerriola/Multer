const TreeController = require('../controllers/tree.controller')
const multer = require('multer')
const { v4 } = require('uuid')
let path = require('path')


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, `server/images/${file.fieldname}/`)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({ //multer settings
    storage: storage,
    fileFilter: function (req, file, cb) {
        if(file.mimetype !== 'image/jpeg') {
            return cb(new Error('Only images are allowed'))
        }
        cb(null, true)
    },
    limits:{
        fileSize: 1024 * 1024
    }
})

module.exports = app => {
    app.get("/api/trees", TreeController.findAll)
    app.get("/api/trees/:_id", TreeController.findOneTree)

    app.post("/api/trees/create/new", upload.single('wholeTree') , TreeController.createTree)   

}




// app.post('/api/trees/new').post(upload.fields({name: 'wholeTree'}), (req,res) =>{
//     console.log()
//     const newTreeData = {
//         genus: req.body.genus,
//         species: req.body.species,
//         commonName: req.body.commonName,
//         habitat: req.body.habitat,
//         wholeTree: req.files['wholeTree'].filename
//     }
//     const newTree = new Tree(newTreeData)

//     newTree.save()
//         .then(() => res.json('Tree Added'))
//         .catch(err => res.json(err))
// })

//, {name: 'leaf', maxCount: 1}, {name: 'trunk', maxCount: 1}, {name: 'fruit', maxCount: 1}, {name: 'bud', maxCount: 1}