const UserController = require('../controllers/user.controller')

module.exports = app => {

    app.get("/api/users", UserController.findAll)
    app.get("/api/users/:_id", UserController.findOneUser)

    app.delete("/api/users/delete/:_id", UserController.deleteUser)

    //Login and Res
    app.post("/api/users/authenticate", UserController.login)
    app.post("/api/users/create/new", UserController.createUser)
    app.get("/api/logout", UserController.logout)
}