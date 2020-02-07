'use strict'

const express = require('express')
const multiparty = require('connect-multiparty')
const AlumnoController = require('../controllers/AlumnoController')
const md_auth = require('../middlewares/authenticated')

var api = express.Router()

api.post('/editar-alumno', md_auth.ensureAuth, AlumnoController.editarAlumno)
api.delete('/eliminar-alumno', md_auth.ensureAuth, AlumnoController.deleteAlumno)
module.exports = api