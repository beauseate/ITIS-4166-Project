const express = require('express');
const controller = require('../controllers/eventController');
const {isLoggedIn, isHost, isEventOwnerToNotRSVP} = require('../middlewares/auth');
const{validateId, validateEvent, validateResult, isDate, isAfter, startMatches, endMatches, validTime} = require('../middlewares/validator');

const router = express.Router();

//GET /stories: send all stories to the user

router.get('/', controller.connections);

//GET /stories/new: send html form for creating a new story

router.get('/newConnection', isLoggedIn, controller.newConnection);

//POST /stories: create a new story

router.post('/', isLoggedIn, validateEvent, validateResult, isDate, isAfter, startMatches, endMatches, validTime, controller.createConnection);

//GET /stories/:id: send details of story by id

router.get('/:id', validateId, controller.showConnection);

//GET /stories/:id/edit: send html form for editing an exsiting story

router.get('/:id/edit', validateId, isLoggedIn, isHost, controller.editConnection);

//PUT /stories/:id update the story identified by id

router.put('/:id', validateId, isLoggedIn, isHost, validateEvent, validateResult, controller.updateConnection);

//DELETE /stories/:id, delete the story identified by id

router.delete('/:id', validateId, isLoggedIn, isHost, controller.deleteConnection);

router.post('/:id/rsvp', isLoggedIn, isEventOwnerToNotRSVP, controller.createOrRSVP);

router.post('/:id/unrsvp', isLoggedIn, isEventOwnerToNotRSVP, controller.unRSVP);



module.exports = router;
