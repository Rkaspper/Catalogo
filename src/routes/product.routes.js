/**
 * Arquivo: src/routes/product.routes.js
 * Descrição: arquivo responsável pelas rotas da api relacionado a classe 'Product'.
 */


const express = require('express');
const productController = require('../controllers/product.controller');

// ==> Definindo as rotas do CRUD - 'Product':

const router = express()

// ==> Definindo as rotas do CRUD - 'Product':

// ==> Rota responsável por listar todos os 'Products': (GET): localhost:8000/api/products
router.get('/products', productController.listAllProducts);

// ==> Rota responsável por selecionar 'Product' pelo 'Codigo': (GET): localhost:8000/api/products/codigo/:codigo
router.get('/products/codigo/:codigo', productController.findProductByCodigo);

// ==> Rota responsável por selecionar 'Product' pelo 'Descricao-completa': (GET): localhost:3000/api/products/descricao/:descricao-completa
router.get('/products/descricao/:descricao_completa', productController.findProductByDescricao);

// ==> Rota responsável por selecionar 'Product' pelo 'Categoria': (GET): localhost:8000/api/products/categoria/:categoria
router.get('/products/categoria/:categoria', productController.findProductByCategoria);

// ==> Rota responsável por selecionar 'Product' pelo 'Categoria': (GET): localhost:8000/api/products/categorias
router.get('/products/categorias', productController.listAllCategoria);

// ==> Rota responsável por selecionar 'Product' pelo 'Grupo': (GET): localhost:8000/api/products/grupo/:grupo
router.get('/products/grupo/:grupo', productController.findProductByGrupo);

// ==> Rota responsável por selecionar 'Product' pelo 'Grupo': (GET): localhost:8000/api/products/grupos
router.get('/products/grupos', productController.listAllGrupo);

module.exports = router;