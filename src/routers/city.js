const express = require('express');
const router = new express.Router();
const CityController = require('../controllers/city-controller');
const controller = new CityController();

router.get('/', controller.getCities);
router.post('/', controller.addCity);
router.get('/:id', controller.getCity);
router.put('/:id', controller.updateCity);
router.delete('/:id', controller.removeCity);

module.exports = router;