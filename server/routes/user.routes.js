const UserController = require('../controllers/user.controller')

module.exports = app => {
    app.get("/api/users", UserController.findAll)
    app.get("/api/users/:_id", UserController.findOneUser)
    app.post("/api/users/new", UserController.createUser)
}