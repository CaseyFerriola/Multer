const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/tree_tracker_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Congrats you found your mongoose"))
    .catch((err) => console.log({messgae: "Your mongoose got away", error: err}))