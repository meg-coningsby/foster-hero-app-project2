const Cat = require('../models/cat');
const User = require('../models/user');

function index(req, res) {
    res.render('cats/index');
}

function newCat(req, res) {
    res.render('cats/new');
}

module.exports = {
    index,
    // show,
    new: newCat,
    // create,
};
