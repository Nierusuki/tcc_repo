const sqlize = require('./utils/DbConn')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./routes')

const app = express()
app.use(cors({origin:'localhost'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

//Define routes
app.use('/', router)
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})


require('dotenv').config()
