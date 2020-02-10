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
        nombre: String//{type: Schema.ObjectId, ref: 'profesor'}
    }
})

module.exports = mongoose.model('alumno', AlumnoSchema)