const express = require('express');
const router = express.Router();
const catsController = require('../controllers/cats');

router.get('/', catsController.index);
router.get('/new', catsController.new);
router.get('/:id', catsController.show);
router.post('/', catsController.create);
router.put('/:id', catsController.update);
router.get('/:id/edit', catsController.edit);
router.delete('/:id', catsController.delete);

module.exports = router;
