const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.get('/', usersController.index);
router.get('/:id', usersController.show);
router.put('/:id', usersController.update);
router.get('/:id/edit', usersController.edit);

module.exports = router;
