'use strict'
const express = require('express')

const CursoController = require('../controllers/CursoController')
const md_auth = require('../middlewares/authenticated')

var api = express.Router()

api.post('/crear-curso', md_auth.ensureAuth, CursoController.crearCurso)
api.post('/getCursos', md_auth.ensureAuth, CursoController.getCursos)
api.put('/editar-curso', md_auth.ensureAuth, CursoController.editarCurso)
api.delete('/eliminar-curso', md_auth.ensureAuth, CursoController.deleteCurso)

module.exports = api