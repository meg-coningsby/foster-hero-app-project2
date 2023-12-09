const express = require('express');
const router = express.Router();
const apptsController = require('../controllers/appts');

router.get('/appts', apptsController.index);
router.post('/cats/:id/appts', apptsController.create);

module.exports = router;
