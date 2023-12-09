const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notes');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.post('/cats/:id/notes', ensureLoggedIn, notesController.create);
router.delete('/notes/:id', ensureLoggedIn, notesController.delete);

module.exports = router;
