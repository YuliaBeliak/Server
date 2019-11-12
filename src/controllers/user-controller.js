const service = require('../services/user-service');

class UserController {
    constructor() {
    }

    addUser(req, res) {
        try {
            const result = service.add(req);
            res.status(200).send(result);
        } catch (err) {
            res.status(400).send({error: err.message});
        }
    }

    getUser(req, res) {
        try {
            const result = service.get(req);
            res.status(200).send(result);
        } catch (err) {
            res.status(400).send({error: err.message});
        }
    }

    updateUser(req, res) {
        try {
            const result = service.update(req);
            res.status(200).send(result);
        } catch (err) {
            res.status(400).send({error: err.message});
        }
    }

    removeUser(req, res) {
        try {
            const result = service.remove(req);
            res.status(200).send(result);
        } catch (err) {
            res.status(400).send({error: err.message});
        }
    }
}

module.exports = UserController;

