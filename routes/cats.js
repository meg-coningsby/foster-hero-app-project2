const express = require('express');
const router = express.Router();
const catsController = require('../controllers/cats');

router.get('/', catsController.index);
router.get('/new', catsController.new);
router.get('/:id', catsController.show);
router.post('/', catsController.create);

module.exports = router;
