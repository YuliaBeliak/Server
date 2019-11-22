const express = require('express');
const router = new express.Router();
const validate = require('../middleware/validation/common-validation');
const {createScheme, updateScheme} = require('../middleware/validation/user-validation');
const UserController = require('../controllers/user-controller');
const controller = new UserController();

router.get('/', controller.getUsers);
router.post('/', validate(createScheme), controller.addUser);
router.get('/:id', controller.getUser);
router.put('/:id', validate(updateScheme), controller.updateUser);
router.delete('/:id', controller.removeUser);

module.exports = router;