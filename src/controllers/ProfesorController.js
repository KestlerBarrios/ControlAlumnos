'use strict'

const Profesor = require('../models/Profesor')


function editarProfesor(req, res) {
    const profesorId = req.params.id
    const params = req.body
    delete params.password

    if(profesorId != req.profesor.sub) {
        return res.status(500).send({ message: 'No posee los permisos para actualizar el Profesor' })
    }
    Profesor.findByIdAndUpdate(profesorId, params, { new: true }, (error, profesorActualizado) => {
        if(error) return res.status(500).send({ message: 'Error en la peticion' })
        if(!profesorActualizado) return res.status(404).send({ message: 'No se ha podido editar el Profesor' })
        return res.status(200).send({ alumno: profesorActualizado })
    })
}

function deleteProfesor (req, res) {
    const profesorId = req.params.id
    if(profesorId != req.profesor.sub) {
        return res.status(500).send({ message: 'No posee los permisos para eliminar el Alumno' })
    }
    Profesor.findByIdAndDelete(profesorId, (error, profesorDeleted) => {
        if(error) return res.status(500).send({ message: 'Error en la peticion' })
        return res.status(200).send({ message: 'Profesor Eliminado', alumnoEliminado: profesorDeleted })
    })
}

function crearCurso (req, res){
    let profesorId = req.params.profesorId
    let params = req.body
    Profesor.findByIdAndUpdate(profesorId, { $push: { cursos: { nombre: params.nombre, descripcion: params.descripcion, costo: params.costo } } }, { new: true }, (err, cursoCreado) => {
        if(err) return res.status(500).send({ message: 'Error en la peticion de curso' })
        if(!cursoCreado) return res.status(404).send({ message: 'Error al guardar el curso' })
        return res.status(200).send({ curso: cursoCreado })
    })        
}

module.exports = {
    editarProfesor,
    deleteProfesor,
    crearCurso
}