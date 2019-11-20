const express = require('express');
const router = new express.Router();
const UserController = require('../controllers/user-controller');
const controller = new UserController();

router.get('/', controller.getUsers);
router.post('/', controller.addUser);
router.get('/:id', controller.getUser);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.removeUser);

module.exports = router;