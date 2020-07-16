const knex = require('knex');
const configuration = require('../../knexfile');
const { connect } = require('../routes');

//* Variáveis ambientes

const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

const connection = knex(config);

module.exports = connection;