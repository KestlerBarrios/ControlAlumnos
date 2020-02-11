'use strict'

const express = require('express')
const ProfesorController = require('../controllers/ProfesorController')
const md_auth = require('../middlewares/authenticated')

var api = express.Router()

api.post('/editar-profesor', md_auth.ensureAuth, ProfesorController.editarProfesor)
api.delete('/eliminar-profesor', md_auth.ensureAuth, ProfesorController.deleteProfesor)
api.get('/getCursos', md_auth.ensureAuth, ProfesorController.getCursos)
module.exports = api