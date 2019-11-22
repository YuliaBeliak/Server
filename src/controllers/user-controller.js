const service = require('../services/user-service');

class UserController {
    constructor() {
    }

    login = async (req, res) => {
        try {
            const result = await service.login(req.body);
            res.status(200).send(result);
        } catch (e) {
            res.status(400).send({error: e.message});
        }
    };

    getUsers = async (req, res) => {
        try {
            const result = await service.getAll();
            res.status(200).send(result);
        } catch (err) {
            res.status(400).send({error: err.message});
        }
    }

    getUser = async (req, res) => {
        try {
            const result = await service.get(req.params.id);
            res.status(200).send(result);
        } catch (err) {
            res.status(400).send({error: err.message});
        }
    }

    addUser = async (req, res) => {
        try {
            const result = await service.add(req.body);
            res.status(201).send(result);
        } catch (err) {
            res.status(400).send({error: err.message});
        }
    }

    updateUser = async (req, res) => {
        try {
            const result = await service.update(req.params.id, req.body);
            res.status(200).send(result);
        } catch (err) {
            res.status(400).send({error: err.message});
        }
    }

    removeUser = async (req, res) => {
        try {
            const result = await service.remove(req.params.id);
            res.status(200).send(result);
        } catch (err) {
            res.status(400).send({error: err.message});
        }
    }
}

module.exports = UserController;

