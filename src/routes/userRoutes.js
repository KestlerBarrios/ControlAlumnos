'use strict'

const express = require('express')
const UserController = require('../controllers/userController')
const md_auth = require('../middlewares/authenticated')

var api = express.Router()
api.post('/registrar-alumno', UserController.registrarAlumno)
api.post('/login', UserController.login)
api.get('/listar-usuarios', UserController.getUsers)
api.post('/registrar-profesor', UserController.registrarProfesor)


module.exports = api