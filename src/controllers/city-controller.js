const service = require('../services/city-service');

class CityController {
    constructor() {
    }

    getCities = async (req, res) => {
        try {
            const result = await service.getAll();
            res.status(200).send(result);
        } catch (err) {
            res.status(400).send({error: err.message});
        }
    };

    getCity = async (req, res) => {
        try {
            const result = await service.get(req.params.id);
            res.status(200).send(result);
        } catch (err) {
            res.status(404).send({error: err.message});
        }
    };

    addCity = async (req, res) => {
        try {
            const result = await service.add(req.body);
            res.status(201).send(result);
        } catch (err) {
            res.status(400).send({error: err.message});
        }
    };

    updateCity = async (req, res) => {
        try {
            const result = await service.update(req.params.id, req.body);
            res.status(200).send(result);
        } catch (err) {
            res.status(400).send({error: err.message});
        }
    };

    removeCity = async (req, res) => {
        try {
            const result = await service.remove(req.params.id);
            res.status(200).send(result);
        } catch (err) {
            res.status(400).send({error: err.message});
        }
    }
}

module.exports = CityController;