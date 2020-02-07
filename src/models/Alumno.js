'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var AlumnoSchema = Schema({
    nombre: String,
    usuario: String,
    email: String,
    password: String, 
    rol: String, 
    cursos: {
        nombre: String
    }
})

module.exports = mongoose.model('alumno', AlumnoSchema)