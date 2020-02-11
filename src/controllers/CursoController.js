'use strict'

const Curso = require('../models/Curso')

function crearCurso(req, res) {
    var curso = new Curso()
    var params = req.body

    if (params.nombre && params.descripcion) {
        curso.nombre = params.nombre
        curso.descripcion = params.descripcion
        curso.costo = params.costo
        
    }
    curso.profesor = req.user.sub
    curso.save((err, cursoGuardado) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (!curso) return res.status(404).send({ message: 'Error al agregar el Curso' })
        return res.status(200).send({ message: 'Curso Agregado', curso: cursoGuardado })
    })
}

function getCursos(req, res) {
    Curso.find().populate('profesor').exec((err, cursos) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion de Cursos' })
        if (!cursos) return res.status(404).send({ message: 'Error al listar Cursos' })
        return res.status(200).send({listadoCursos: cursos})
    })

}

function editarCurso(req, res) {
    const cursoId = req.params.id
    const params = req.body
    if (cursoId != req.profesor.sub) {
        return res.status(500).send({ message: 'No posee los permisos para actualizar el Curso' })
    }
    Curso.findByIdAndUpdate(cursoId, params, { new: true }, (error, cursoActualizado) => {
        if (error) return res.status(500).send({ message: 'Error en la peticion' })
        if (!cursoActualizado) return res.status(404).send({ message: 'No se ha podido editar el Curso' })
        return res.status(200).send({ curso: cursoActualizado })
    })
}

function deleteCurso(req, res) {
    const cursoId = req.params.id
    if (cursoId != req.profesor.sub) {
        return res.status(500).send({ message: 'No posee los permisos para eliminar el Curso' })
    }
    Curso.findByIdAndDelete(cursoId, (error, cursoDeleted) => {
        if (error) return res.status(500).send({ message: 'Error en la peticion' })
        return res.status(200).send({ message: 'Curso Eliminado', alumnoEliminado: cursoDeleted })
    })
}

module.exports = {
    crearCurso,
    editarCurso,
    deleteCurso,
    getCursos

}