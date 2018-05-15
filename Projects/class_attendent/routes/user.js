const express = require('express');
const router = express.Router({ mergeParams: true });
const UserController = require('../controllers/user_controller');
const middleware = require('../middleware');

router.get('/', UserController.index);

//router.post('/', UserController.create);

//router.get('/new', UserController.new);

router.get('/:id', UserController.show);

//router.get('/:id/edit', UserController.edit);

router.put('/:id', UserController.update);

router.delete('/:id', UserController.delete);

module.exports = router;