const Cat = require('../models/cat');
const User = require('../models/user');

async function index(req, res) {
    const users = await User.find({}).sort('name');
    const allCatsInCare = await Cat.find({
        status: { $in: ['In Care', 'Up for Adoption'] },
    }).populate('carer');
    const userCounts = getCarerCatCount(users, allCatsInCare);
    res.render('users/index', {
        title: 'All Foster Carers',
        users,
        userCounts,
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
        res.redirect(`/users/${user._id}`);
    } catch (err) {
        console.log(err);
        res.render('error', err);
    }
}

async function remove(req, res) {
    try {
        const result = await User.deleteOne({ _id: req.params.id });
        res.redirect('/users');
    } catch (err) {
        console.log(err);
        res.render('error', err);
    }
}

module.exports = {
    index,
    indexActive,
    indexInactive,
    show,
    edit,
    update,
    delete: remove,
};

// Other functions to help with the above

function getCarerCatCount(users, cats) {
    const carerCatCount = {};
    cats.forEach((cat) => {
        const carerId = cat.carer._id.toString();
        if (carerCatCount[carerId]) {
            carerCatCount[carerId].count++;
        } else {
            carerCatCount[carerId] = {
                carer: cat.carer.name,
                count: 1,
            };
        }
    });
    const result = Object.values(carerCatCount);
    return result;
}
