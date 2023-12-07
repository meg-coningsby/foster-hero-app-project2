const express = require('express');
const router = express.Router();
const vetsController = require('../controllers/vets');

router.get('/', vetsController.index);
router.get('/:id', vetsController.show);

module.exports = router;
