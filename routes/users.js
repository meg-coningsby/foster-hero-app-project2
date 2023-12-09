const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', ensureLoggedIn, usersController.index);
router.get('/active', ensureLoggedIn, usersController.indexActive);
router.get('/inactive', ensureLoggedIn, usersController.indexInactive);
router.get('/:id', ensureLoggedIn, usersController.show);
router.put('/:id', ensureLoggedIn, usersController.update);
router.get('/:id/edit', ensureLoggedIn, usersController.edit);

module.exports = router;
