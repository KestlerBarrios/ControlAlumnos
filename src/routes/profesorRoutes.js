'use strict'

const express = require('express')
const ProfesorController = require('../controllers/ProfesorController')
const md_auth = require('../middlewares/authenticated')

var api = express.Router()

api.post('/editar-profesor', md_auth.ensureAuth, ProfesorController.editarProfesor)
api.delete('/eliminar-profesor', md_auth.ensureAuth, ProfesorController.deleteProfesor)
api.put('/crear-cursos/:profesorId', md_auth.ensureAuth, ProfesorController.crearCurso)

module.exports = api