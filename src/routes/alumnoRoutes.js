'use strict'

const express = require('express')
const AlumnoController = require('../controllers/AlumnoController')
const md_auth = require('../middlewares/authenticated')

var api = express.Router()

api.post('/editar-alumno', md_auth.ensureAuth, AlumnoController.editarAlumno)
api.delete('/eliminar-alumno', md_auth.ensureAuth, AlumnoController.deleteAlumno)
api.put('/asignar-cursos/:alumnoId', md_auth.ensureAuth, AlumnoController.asignarCurso)

module.exports = api