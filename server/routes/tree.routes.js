const TreeController = require('../controllers/tree.controller')

const treeImageHandler = require('../multer')






module.exports = app => {
    app.get("/api/trees", TreeController.findAll)
    app.get("/api/trees/:_id", TreeController.findOneTree)
    app.post("/api/trees/create/new", treeImageHandler)   
    app.delete("/api/trees/delete/:_id", TreeController.deleteTree)
}




