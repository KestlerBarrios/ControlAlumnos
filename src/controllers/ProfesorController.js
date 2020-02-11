'use strict'

const Profesor = require('../models/Profesor')
const Curso = require('../models/Curso')


function editarProfesor(req, res) {
    const profesorId = req.params.id
    const params = req.body
    delete params.password

    if (profesorId != req.profesor.sub) {
        return res.status(500).send({ message: 'No posee los permisos para actualizar el Profesor' })
    }
    Profesor.findByIdAndUpdate(profesorId, params, { new: true }, (error, profesorActualizado) => {
        if (error) return res.status(500).send({ message: 'Error en la peticion' })
        if (!profesorActualizado) return res.status(404).send({ message: 'No se ha podido editar el Profesor' })
        return res.status(200).send({ profesor: profesorActualizado })
    })
}

function deleteProfesor(req, res) {
    const profesorId = req.params.id
    if (profesorId != req.profesor.sub) {
        return res.status(500).send({ message: 'No posee los permisos para eliminar el Curso' })
    }
    Profesor.findByIdAndDelete(profesorId, (error, profesorDeleted) => {
        if (error) return res.status(500).send({ message: 'Error en la peticion' })
        return res.status(200).send({ message: 'Profesor Eliminado', alumnoEliminado: profesorDeleted })
    })
}

function getCursos(req, res) {
    const { profesor } = req.body
    Curso.find({ nombre: { $regex: `${ profesor.id }` } }, (error, cursos) => {
        if(error) return res.status(500).send({ message: 'Error en la peticion' })
        return res.status(200).send({ cursos: cursos })
    })
}

module.exports = {
    editarProfesor,
    deleteProfesor,
    getCursos
}