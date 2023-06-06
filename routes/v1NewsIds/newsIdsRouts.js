const express = require('express');
const newIdsRoutsV1 =  express.Router();

const NewIdsController = require('../../controllers/newIdsControllers');

const newIdsController = new NewIdsController();

newIdsRoutsV1.get('/newIds', newIdsController.getNewIds);

newIdsRoutsV1.post('/newIds', newIdsController.createNewIds);

newIdsRoutsV1.put('/newIds/:id', newIdsController.updateNewIds);

newIdsRoutsV1.delete('/newIds/:id', newIdsController.deleteNewIds);

module.exports = newIdsRoutsV1;