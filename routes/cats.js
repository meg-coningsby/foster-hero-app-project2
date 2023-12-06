const express = require('express');
const router = express.Router();
const catsController = require('../controllers/cats');

router.get('/', catsController.index);
router.get('/new', catsController.new);

module.exports = router;
