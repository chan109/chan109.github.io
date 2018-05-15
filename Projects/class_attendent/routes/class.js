const express = require('express');
const router = express.Router({ mergeParams: true });
const ClassController = require('../controllers/class_controller');
const middleware = require('../middleware');

router.get('/', ClassController.index);

router.post('/', ClassController.create);

//router.get('/new', ClassController.new);

router.get('/:id', ClassController.show);

//router.get('/:id/edit', ClassController.edit);

router.put('/:id', ClassController.update);

router.delete('/:id', ClassController.delete);

router.post('/:id/add_student', ClassController.add_student);

router.post('/:id/add_attendent', ClassController.add_attendent);

router.post('/:id/remove_attendent', ClassController.remove_attendent);

module.exports = router;