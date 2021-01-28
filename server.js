const express = require('express')
const app = express()
const multer = require('multer')

const port = 8000

const cors = require('cors')

app.use(cors())

require('./server/config/mongoose.config')

app.use(express.json(), express.urlencoded({extended: true}))

require('./server/routes/tree.routes')(app)

require('./server/routes/user.routes')(app)


app.listen(8000, () => {
    console.log(`You are all set on port ${port}`)
})

