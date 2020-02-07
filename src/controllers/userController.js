'use strict'

const bcrypt = require('bcrypt-nodejs')
const path = require('path')
const fs = require('fs')

const User = require('../models/User')
const jwt = require('../services/jwt')


function registrar(req, res) {
    var user = new User()
    var params = req.body

    if (params.nombre && params.password && params.email) {
        user.nombre = params.nombre
        user.usuario = params.usuario
        user.email = params.email
        user.rol = "ROL_ALUMNO"

        User.find({ $or: [{ usuario: user.usuario }, { email: user.email }] }).exec((err, users) => {
            if (err) return res.status(500).send({ message: 'Error en la peticion de usuario.' })
            if (users && users.length >= 1) {
                return res.status(500).send({ message: 'El usuario ya existe' })
            } else {
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    user.password = hash
                    user.save((err, usuarioGuardado) => {
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

function login(req, res) {
   const params = req.body
   
   User.findOne({email: params.email}, (err, usuario) =>{
    if(err) return res.status(500).send({ message: 'Error en la peticion' })
    if (usuario) {
        bcrypt.compare(params.password, usuario.password, (err, check) =>{
            if (check) {
                if (params.gettoken) {
                    return res.status(200).send({token: jwt.createToken(usuario)})
                }else{
                    usuario.password = undefined
                    return res.status(200).send({user: usuario})
                }
            }else{
                res.status(404).send({ message: 'El usuario no se ha podido identificar.' })
            }
        })
    }else{
        return res.status(404).send({ message: 'El usuario no se ha podido logear' })
    }
   })
    
}

function getUsers(req, res) {
    User.find().exec((error, users) => {
        if(error) return res.status(500).send({ message: 'Error en la peticion' })
        return res.status(200).send({ users: users })
    })
}

module.exports = {
    registrar,
    login,
    getUsers
}