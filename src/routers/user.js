const express = require('express');
const router = new express.Router();
const UserController = require('../controllers/user-controller');
const controller = new UserController();


router.get('/', controller.getUsers);
router.get('/:id', controller.getUser);
router.post('/', controller.addUser);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.removeUser);

module.exports = router;