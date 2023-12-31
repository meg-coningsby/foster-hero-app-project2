const express = require('express');
const router = express.Router();
const catsController = require('../controllers/cats');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', ensureLoggedIn, catsController.index);
router.get('/new', ensureLoggedIn, catsController.new);
router.get('/adoptable', catsController.indexAdoptable);
router.get('/incare', ensureLoggedIn, catsController.indexInCare);
router.get('/adopted', ensureLoggedIn, catsController.indexAdopted);
router.get('/:id', ensureLoggedIn, catsController.show);
router.post('/', ensureLoggedIn, catsController.create);
router.put('/:id', ensureLoggedIn, catsController.update);
router.get('/:id/edit', ensureLoggedIn, catsController.edit);
router.delete('/:id', ensureLoggedIn, catsController.delete);

module.exports = router;
