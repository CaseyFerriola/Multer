const express = require('express')
const app = express()
const path = require('path')
const multer = require('multer')
const cookieParser = require('cookie-parser')
const port = 8000

const cors = require('cors')

require('dotenv').config()

app.use(cookieParser())

app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

require('./server/config/mongoose.config')

app.use(express.json(), express.urlencoded({extended: true}))
console.log(path.join(__dirname, 'server', 'public'))
app.use('/static', express.static(path.join(__dirname, 'server','public')));

require('./server/routes/tree.routes')(app)

require('./server/routes/user.routes')(app)


app.listen(8000, () => {
    console.log(`You are all set on port ${port}`)
})

