/**
 * Arquivo: config/database.js
 * Descrição: arquivo responsável pelas 'connectionStrings da aplicação: PostgreSQL.
 */

const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// ==> Conexão com a Base de Dados:
const pool = new Pool({
  dialect: 'postgres',
  host: '167.250.29.154',
  user: 'srv.giro',
  password: 'cVlzJ7QaBfAa2f1GS4ln',
  database: 'datawarehouse',
  port: 54325
});

pool.on('connect', () => {
  console.log('Base de Dados conectado com sucesso!');
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};