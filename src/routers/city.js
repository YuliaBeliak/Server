const express = require('express');
const router = new express.Router();
const CityController = require('../controllers/city-controller');
const validate = require('../middleware/validation/common-validation');
const {createScheme, updateScheme} = require('../middleware/validation/city-validation');
const controller = new CityController();

router.get('/', controller.getCities);
router.post('/', validate(createScheme), controller.addCity);
router.get('/:id', controller.getCity);
router.put('/:id', validate(updateScheme), controller.updateCity);
router.delete('/:id', controller.removeCity);

module.exports = router;