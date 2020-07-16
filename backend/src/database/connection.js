const knex = require('knex');
const configuration = require('../../knexfile');
const { connect } = require('../routes');

const connection = knex(configuration.development);

module.exports = connection;