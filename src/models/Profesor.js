'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var ProfesorSchema = Schema({
    nombre: String,
    usuario: String,
    email: String,
    password: String, 
    rol: String, 
    cursos: {type: Schema.ObjectId, ref: 'cursos'}
})

module.exports = mongoose.model('profesor', ProfesorSchema)