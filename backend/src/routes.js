const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentCotroller = require('./controllers/IncidentCotroller');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentCotroller.index);
routes.post('/incidents', IncidentCotroller.create);
routes.delete('/incidents/:id', IncidentCotroller.delete);

module.exports = routes;