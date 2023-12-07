const Cat = require('../models/cat');
const User = require('../models/user');

async function index(req, res) {
    const users = await User.find({});
    res.render('users/index', { title: 'All Foster Carers', users });
}

async function show(req, res) {
    // I'll need to populate the cat docs instead of ObjectIds
    const user = await User.findById(req.params.id);
    res.render('users/show', { title: `Foster Carer Details`, user });
}

module.exports = {
    index,
    show,
};
