const express = require('express');
const usersRoutsV1 =  express.Router();

const UserController = require('../../controllers/userControllers');

const userController = new UserController();

usersRoutsV1.get('/users', userController.getUsers);

usersRoutsV1.post('/users', userController.createUser);

usersRoutsV1.put('/users/:id', userController.updateUser);

usersRoutsV1.delete('/users/:id', userController.deleteUser);

module.exports = usersRoutsV1;