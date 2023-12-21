const express = require('express');
const router = express.Router();
const apptsController = require('../controllers/appts');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/appts', ensureLoggedIn, apptsController.index);
router.post('/cats/:id/appts', ensureLoggedIn, apptsController.create);
router.get('/appts/:id/edit', ensureLoggedIn, apptsController.edit);
router.delete('/appts/:id', ensureLoggedIn, apptsController.delete);

module.exports = router;
