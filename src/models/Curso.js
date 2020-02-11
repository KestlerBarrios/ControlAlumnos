'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var CursoSchema = Schema({
    nombre: String,
    descripcion: String,
    costo: Number,
    profesor: {type: Schema.ObjectId, ref: 'profesor'}
})

module.exports = mongoose.model('curso', CursoSchema)