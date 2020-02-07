'use strict'

const express = require('express')
const multiparty = require('connect-multiparty')
const UserController = require('../controllers/userController')
const md_auth = require('../middlewares/authenticated')

var api = express.Router()
api.post('/registrar', UserController.registrar)
api.post('/login', UserController.login)

module.exports = api