const service = require('../services/user-service');

class UserController {
    constructor() {
    }

    getUsers(req, res) {
        try {
            const result = service.show();
            res.status(200).send(result);
        } catch (err) {
            res.status(400).send({error: err.message});
        }
    }

    addUser(req, res) {
        try {
            const result = service.add(req.body);
            res.status(200).send(result);
        } catch (err) {
            res.status(400).send({error: err.message});
        }
    }

    getUser(req, res) {
        try {
            const result = service.get(req.params.id);
            res.status(200).send(result);
        } catch (err) {
            res.status(400).send({error: err.message});
        }
    }

    updateUser(req, res) {
        try {
            const result = service.update(req.params.id, req.body);
            res.status(200).send(result);
        } catch (err) {
            res.status(400).send({error: err.message});
        }
    }

    removeUser(req, res) {
        try {
            const result = service.remove(req.params.id);
            res.status(200).send(result);
        } catch (err) {
            res.status(400).send({error: err.message});
        }
    }
}

module.exports = UserController;

