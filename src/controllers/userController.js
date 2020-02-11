'use strict'

const bcrypt = require('bcrypt-nodejs')

const Profesor = require('../models/Profesor')
const Alumno = require('../models/Alumno')
const jwt = require('../services/jwt')


function registrarAlumno(req, res) {
    var alumno = new Alumno()
    var params = req.body

    if (params.nombre && params.password && params.email) {
        alumno.nombre = params.nombre
        alumno.usuario = params.usuario
        alumno.email = params.email
        alumno.rol = "ROL_ALUMNO"

        Alumno.find({ $or: [{ usuario: alumno.usuario }, { email: alumno.email }] }).exec((err, alumnos) => {
            if (err) return res.status(500).send({ message: 'Error en la peticion de usuario.' })
            if (alumnos && alumnos.length >= 1) {
                return res.status(500).send({ message: 'El usuario ya existe' })
            } else {
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    alumno.password = hash
                    alumno.save((err, usuarioGuardado) => {
                        if (err) return res.status(500).send({ message: 'Error al guardar el usuario.' })
                        if (usuarioGuardado) {
                            res.status(200).send({ user: usuarioGuardado })
                        } else {
                            res.status(404).send({ message: 'No se ha podido guardar el usuario' })
                        }
                    })
                })
            }

        })

    } else {
        res.status(200).send({ message: 'Rellene todos los espacios necesarios' })
    }
}

function registrarProfesor(req, res) {
    var profesor = new Profesor()
    var params = req.body

    if (params.nombre && params.password && params.email) {
        profesor.nombre = params.nombre
        profesor.usuario = params.usuario
        profesor.email = params.email
        profesor.rol = "ROL_MAESTRO"

        Profesor.find({ $or: [{ usuario: profesor.usuario }, { email: profesor.email }] }).exec((err, profesores) => {
            if (err) return res.status(500).send({ message: 'Error en la peticion de usuario.' })
            if (profesores && profesores.length >= 1) {
                return res.status(500).send({ message: 'El usuario ya existe' })
            } else {
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    profesor.password = hash
                    profesor.save((err, profesorGuardado) => {
                        if (err) return res.status(500).send({ message: 'Error al guardar el usuario.' })
                        if (profesorGuardado) {
                            res.status(200).send({ user: profesorGuardado })
                        } else {
                            res.status(404).send({ message: 'No se ha podido guardar el usuario' })
                        }
                    })
                })
            }

        })

    } else {
        res.status(200).send({ message: 'Rellene todos los espacios necesarios' })
    }
}

function login(req, res) {
    const params = req.body

    Alumno.findOne({ email: params.email }, (err, alumno) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (alumno) {
            bcrypt.compare(params.password, alumno.password, (err, check) => {
                if (check) {
                    if (params.gettoken) {
                        return res.status(200).send({ token: jwt.createToken(alumno) })
                    } else {
                        alumno.password = undefined
                        return res.status(200).send({ user: alumno })
                    }
                } else {
                    res.status(404).send({ message: 'El usuario no se ha podido identificar.' })
                }
            })
        } else {
            Profesor.findOne({ email: params.email }, (err, profesor) => {
                if (err) return res.status(500).send({ message: 'Error en la peticion' })
                if (profesor) {
                    bcrypt.compare(params.password, profesor.password, (err, check) => {
                        if (check) {
                            if (params.gettoken) {
                                return res.status(200).send({ token: jwt.createToken(profesor) })
                            } else {
                                profesor.password = undefined
                                return res.status(200).send({ profesor: profesor })
                            }
                        } else {
                            res.status(404).send({ message: 'El usuario no se ha podido identificar.' })
                        }
                    })
                } else {
                    return res.status(404).send({ message: 'El usuario no se ha podido logear' })
                }
            })
        }
    })
}

module.exports = {
    registrarAlumno,
    login,
    registrarProfesor
}