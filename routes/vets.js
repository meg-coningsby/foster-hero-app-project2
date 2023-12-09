const express = require('express');
const router = express.Router();
const vetsController = require('../controllers/vets');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', ensureLoggedIn, vetsController.index);
router.get('/:id', ensureLoggedIn, vetsController.show);

module.exports = router;
