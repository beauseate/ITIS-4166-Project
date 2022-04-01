const express = require('express');
const controller = require('../controllers/eventController')

const router = express.Router();

//GET /stories: send all stories to the user

router.get('/', controller.connections);

//GET /stories/new: send html form for creating a new story

router.get('/newConnection', controller.newConnection);

//POST /stories: create a new story

router.post('/', controller.createConnection);

//GET /stories/:id: send details of story by id

router.get('/:id', controller.showConnection);

//GET /stories/:id/edit: send html form for editing an exsiting story

router.get('/:id/edit', controller.editConnection);

//PUT /stories/:id update the story identified by id

router.put('/:id', controller.updateConnection);

//DELETE /stories/:id, delete the story identified by id

router.delete('/:id', controller.deleteConnection);


module.exports = router;
