const Cat = require('../models/cat');
const User = require('../models/user');

async function index(req, res) {
    const users = await User.find({}).sort('name');
    res.render('users/index', {
        title: 'All Foster Carers',
        users,
    });
}

async function indexActive(req, res) {
    const users = await User.find({
        status: 'Active',
    });
    res.render('users/index-active', { title: 'Active Foster Carers', users });
}

async function indexInactive(req, res) {
    const users = await User.find({
        status: 'Inactive',
    });
    res.render('users/index-inactive', { title: 'Inactive Carers', users });
}

async function show(req, res) {
    const loggedInUserId = req.user._id;
    const user = await User.findById(req.params.id);
    const catsInCare = await Cat.find({
        carer: req.params.id,
        status: { $in: ['In Care', 'Up for Adoption'] },
    });
    res.render('users/show', {
        title: `${user.name}`,
        user,
        catsInCare,
        loggedInUserId,
        errorMsg: '',
    });
}

async function edit(req, res) {
    const loggedInUserId = req.user._id;
    const user = await User.findById(req.params.id);
    if (user._id.toString() === loggedInUserId.toString()) {
        res.render('users/edit', {
            user,
            title: `Edit ${user.name}`,
            errorMsg: '',
        });
    } else res.redirect(`/users/${user._id}`);
}

async function update(req, res) {
    const user = await User.findById(req.params.id);
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    try {
        const result = await User.updateOne(
            { _id: req.params.id },
            {
                $set: req.body,
            }
        );
    } catch (err) {
        console.log(err);
    }
    res.redirect(`/users/${user._id}`);
}

module.exports = {
    index,
    indexActive,
    indexInactive,
    show,
    edit,
    update,
};
