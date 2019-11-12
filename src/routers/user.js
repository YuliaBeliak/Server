const express = require('express');
const router = new express.Router();
const UserController = require('../controllers/user-controller');
const controller = new UserController();


router.get('/', controller.getUser);
router.post('/', controller.addUser);
router.put('/', controller.updateUser);
router.delete('/', controller.removeUser);

module.exports = router;