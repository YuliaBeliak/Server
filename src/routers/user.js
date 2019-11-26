const express = require('express');
const router = new express.Router();
const validate = require('../middleware/validation/common-validation');
const auth = require('../middleware/auth');
const {createScheme, updateScheme, loginScheme} = require('../middleware/validation/user-validation');
const UserController = require('../controllers/user-controller');
const controller = new UserController();

router.get('/', auth, controller.getUsers);
router.post('/', validate(createScheme), controller.addUser);
router.get('/:id', auth, controller.getUser);
router.put('/:id', auth, validate(updateScheme), controller.updateUser);
router.delete('/:id', auth, controller.removeUser);
router.post('/login', validate(loginScheme), controller.login);
router.post('/token', controller.getNewToken);

module.exports = router;