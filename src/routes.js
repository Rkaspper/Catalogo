const express = require('express')
const routes = express.Router()
const IndexController = require('./app/controllers/IndexController')

routes.get('/catalogo', IndexController.tela)

module.exports = routes
