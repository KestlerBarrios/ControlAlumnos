'use strict'

const Alumno = require('../models/Alumno')


function editarAlumno(req, res) {
    const alumnoId = req.params.id
    const params = req.body
    delete params.password

    if (alumnoId != req.user.sub) {
        return res.status(500).send({ message: 'No posee los permisos para actualizar el Alumno' })
    }
    User.findByIdAndUpdate(alumnoId, params, { new: true }, (error, alumnoActualizado) => {
        if (error) return res.status(500).send({ message: 'Error en la peticion' })
        if (!alumnoActualizado) return res.status(404).send({ message: 'No se ha podido editar el Alumno' })
        return res.status(200).send({ alumno: alumnoActualizado })
    })
}

function deleteAlumno(req, res) {
    const alumnoId = req.params.id
    if (alumnoId != req.user.sub) {
        return res.status(500).send({ message: 'No posee los permisos para eliminar el Alumno' })
    }
    User.findByIdAndDelete(alumnoId, (error, alumnoDeleted) => {
        if (error) return res.status(500).send({ message: 'Error en la peticion' })
        return res.status(200).send({ message: 'Alumno Eliminado', alumnoEliminado: alumnoDeleted })
    })
}

function asignarCurso(req, res) {
    let params = req.body
    let cursoId = params.cursoId
    Alumno.findByIdAndUpdate(req.user.sub, { $push: { cursos: { nombre: cursoId  } } }, { new: true }, (err, cursoActualizado) => {
        console.log(cursoId);
        if (err) return res.status(500).send({ message: 'Error en la peticion de curso' })
        if (!cursoActualizado) return res.status(404).send({ message: 'Error al guardar el curso' })
        return res.status(200).send({ curso: cursoActualizado })
    })
}
module.exports = {
    editarAlumno,
    deleteAlumno,
    asignarCurso
}