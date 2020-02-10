'use strict'

const express = require('express')
const UserController = require('../controllers/userController')
const md_auth = require('../middlewares/authenticated')

var api = express.Router()
api.post('/registrar-alumno', UserController.registrarAlumno)
api.post('/registrar-profesor', UserController.registrarProfesor)
api.post('/login', UserController.login)


module.exports = api