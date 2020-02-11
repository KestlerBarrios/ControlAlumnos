'use strict'

const express = require('express')
const cors = require('cors')
const app = express()
const bodyparser = require('body-parser')

const USER_ROUTES = require('./routes/userRoutes')
const ALUMNO_ROUTES = require('./routes/alumnoRoutes')
const PROFESOR_ROUTES = require('./routes/profesorRoutes')


app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.use(cors())

app.use('/api', USER_ROUTES, ALUMNO_ROUTES, PROFESOR_ROUTES )


module.exports = app