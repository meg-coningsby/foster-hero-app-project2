const express = require('express');
const router = express.Router();
const catsController = require('../controllers/cats');

router.get('/', catsController.index);
router.delete('/:id', catsController.delete);
router.get('/new', catsController.new);
router.get('/:id', catsController.show);
router.post('/', catsController.create);
router.put('/:id', catsController.update);
router.get('/:id/edit', catsController.edit);
router.post('/:id/users', catsController.addUserToCat);

module.exports = router;
