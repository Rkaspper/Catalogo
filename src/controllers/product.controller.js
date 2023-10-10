/**
 * Arquivo: src/controllers/funcionario.controller.js
 * Descrição: arquivo responsável pelo CRUD da classe 'Product'
 */

const db = require('../config/database');

// ==> Método responsável por listar todos os 'Products':
exports.listAllProducts = async (req, res) => {
  const response = await db.query(
    'SELECT * FROM itens_catalogo ORDER BY codigo LIMIT 50 ',
  );
  res.status(200).send(response.rows);
};

// ==> Método responsável por listar todos os 'Products':
exports.listAllCategoria = async (req, res) => {
  const response = await db.query(
    'SELECT distinct categoria FROM itens_catalogo ORDER BY categoria LIMIT 50 ',
  );
  res.status(200).send(response.rows);
};


// ==> Método responsável por selecionar 'Product' pelo 'Codigo':
exports.findProductByCodigo = async (req, res) => {
  const productCod = req.params.codigo;
  const response = await db.query(
    'SELECT * FROM itens_catalogo WHERE codigo like $1 LIMIT 50 ',
    ['%' + productCod + '%'],
  );
  res.status(200).send(response.rows);
};

// ==> Método responsável por selecionar 'Product' pelo 'Descricao_completa':
exports.findProductByDescricao = async (req, res) => {
  const productDes = req.params.descricao_completa;
  const response = await db.query(
    'SELECT * FROM itens_catalogo WHERE descricao_completa like $1 LIMIT 50 ',
    ['%' + productDes + '%'],
  );
  res.status(200).send(response.rows);
};

// ==> Método responsável por selecionar 'Product' pelo 'Categoria':
exports.findProductByCategoria = async (req, res) => {
  const productCat = req.params.categoria;
  const response = await db.query(
    'SELECT * FROM itens_catalogo WHERE categoria = $1 LIMIT 50 ',
    [productCat],
  );
  res.status(200).send(response.rows);
};


