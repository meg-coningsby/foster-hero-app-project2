const express = require('express');
const router = express.Router();
const apptsController = require('../controllers/appts');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/appts', ensureLoggedIn, apptsController.index);
router.post('/cats/:id/appts', ensureLoggedIn, apptsController.create);

module.exports = router;
