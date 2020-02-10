'use strict'

const express = require('express')
const cors = require('cors')
const app = express()
const bodyparser = require('body-parser')

const USER_ROUTES = require('./routes/userRoutes')
const ALUMNO_USER = require('./routes/alumnoRoutes')


app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.use(cors())

app.use('/api', USER_ROUTES, ALUMNO_USER)


module.exports = app