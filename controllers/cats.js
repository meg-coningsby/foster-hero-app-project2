const Cat = require('../models/cat');
const User = require('../models/user');

async function index(req, res) {
    const cats = await Cat.find({});
    res.render('cats/index', { title: 'All Cats', cats });
}

async function newCat(req, res) {
    res.render('cats/new', { title: 'Add a Cat', errorMsg: '' });
}

async function show(req, res) {
    // I'll need to populate the vet appts docs instead of ObjectIds
    const cat = await Cat.findById(req.params.id);
    const users = await User.find({}).sort('name');
    let fosterCarer = null;
    let fosterCarerName = null;
    if (cat.carer != null) {
        fosterCarer = await User.find({
            _id: cat.carer,
        });
        fosterCarerName = fosterCarer[0].name;
    }
    res.render('cats/show', {
        users,
        title: `Cat Details`,
        cat,
        fosterCarerName,
    });
}

async function create(req, res) {
    req.body.vaccinated = !!req.body.vaccinated;
    req.body.desexed = !!req.body.desexed;
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    try {
        const cat = await Cat.create(req.body);
        res.redirect(`/cats/${cat._id}`);
    } catch (err) {
        console.log(err);
        res.render('cats/new', { errorMsg: err.message });
    }
}

async function edit(req, res) {
    const cat = await Cat.findById(req.params.id);
    let intakeDate = cat.intake;
    let birthDate = cat.birthDate;
    let adoptDate = cat.adoptDate;
    // console.log(intakeDate, birthDate, adoptDate);
    intakeDate =
        intakeDate !== undefined ? String(intakeDate).split('T')[0] : undefined;
    birthDate =
        birthDate !== undefined ? String(birthDate).split('T')[0] : undefined;
    adoptDate =
        adoptDate !== undefined ? String(adoptDate).split('T')[0] : undefined;
    // console.log(intakeDate, birthDate, adoptDate);
    res.render('cats/edit', {
        cat,
        intakeDate,
        birthDate,
        adoptDate,
    });
}

async function update(req, res) {
    const cat = await Cat.findById(req.params.id);
    req.body.vaccinated = !!req.body.vaccinated;
    req.body.desexed = !!req.body.desexed;
    req.body.adopted = !!req.body.adopted;
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    try {
        const result = await Cat.updateOne(
            { _id: req.params.id },
            {
                $set: req.body,
            }
        );
        console.log(result);
        res.redirect(`/cats/${cat._id}`);
    } catch (err) {
        console.log(err);
        res.render(`/cats/${cat._id}/edit`, { errorMsg: err.message });
    }
}

async function remove(req, res) {
    try {
        const result = await Cat.deleteOne({ _id: req.params.id });
        res.redirect('/cats');
    } catch (err) {
        console.log(err);
        res.render(`/cats/${cat._id}`, { errorMsg: err.message });
    }
}

async function addUserToCat(req, res) {
    const cat = await Cat.findById(req.params.id);
    cat.carer = req.body.user;
    await cat.save();
    const user = await User.findById(req.body.user);
    user.cats.push(req.params.id);
    await user.save();
    res.redirect(`/cats/${cat._id}`);
}

module.exports = {
    index,
    show,
    new: newCat,
    create,
    edit,
    update,
    delete: remove,
    addUserToCat,
};
