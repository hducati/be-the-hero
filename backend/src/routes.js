/**
 * Criando arquivo de routes
 */

const { celebrate, Segments, Joi } = require('celebrate');
const express = require('express');
const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const { join } = require('./database/connection');

const routes = express.Router();

routes.post('/sessions',celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
    }),
}), SessionController.create);

routes.get('/ongs', OngController.index);

routes.post('/ongs', celebrate({
   [Segments.BODY]: Joi.object().keys({
       name: Joi.string().required(),
       email: Joi.string().required().email(),
       whatsapp: Joi.string().required().min(10).max(11),
       city: Joi.string().required(),
       uf: Joi.string().required().length(2),
   }) 
}), OngController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        Authorization: Joi.string(), 
    }).unknown(),
    
}), ProfileController.index)

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    }),
}), IncidentController.index);

routes.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    }),
    [Segments.HEADERS]: Joi.object({
        Authorization: Joi.string(),
    }).unknown(),
}), IncidentController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
}), IncidentController.delete);

module.exports = routes;