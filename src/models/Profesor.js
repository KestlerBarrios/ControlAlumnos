'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var ProfesorSchema = Schema({
    nombre: String,
    usuario: String,
    email: String,
    password: String, 
    rol: String, 
    cursos: [{
        nombre: String,
        descripcion: String,
        costo: Number
    }]
})

module.exports = mongoose.model('profesor', ProfesorSchema)