const Cat = require('../models/cat');
const User = require('../models/user');

async function index(req, res) {
    const users = await User.find({});
    res.render('users/index', { title: 'All Foster Carers', users });
}

async function show(req, res) {
    const loggedInUserId = req.user._id;
    const user = await User.findById(req.params.id);
    const catsInCare = await Cat.find({
        carer: req.params.id,
    });
    res.render('users/show', {
        title: `${user.name}`,
        user,
        catsInCare,
        loggedInUserId,
    });
}

async function edit(req, res) {
    const loggedInUserId = req.user._id;
    const user = await User.findById(req.params.id);
    if (user._id.toString() === loggedInUserId.toString()) {
        res.render('users/edit', { user, title: `Edit ${user.name}` });
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
        console.log(result);
        res.redirect(`/users/${user._id}`);
    } catch (err) {
        console.log(err);
        res.render(`/users/${user._id}/edit`, { errorMsg: err.message });
    }
}

module.exports = {
    index,
    show,
    edit,
    update,
};
