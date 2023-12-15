const Cat = require('../models/cat');
const User = require('../models/user');
const Vet = require('../models/vet');
const Appt = require('../models/appt');

async function index(req, res) {
    const cats = await Cat.find({});
    res.render('cats/index', { title: 'All Cats', cats });
}

async function indexAdoptable(req, res) {
    const cats = await Cat.find({
        status: 'Up for Adoption',
    });
    res.render('cats/index-adoptable', { title: 'Cats Up for Adoption', cats });
}

async function indexInCare(req, res) {
    const cats = await Cat.find({
        status: 'In Care',
    });
    res.render('cats/index-inCare', { title: 'Cats In Care', cats });
}

async function indexAdopted(req, res) {
    const cats = await Cat.find({
        status: 'Adopted',
    });
    res.render('cats/index-adopted', { title: 'Cats Adopted', cats });
}

async function newCat(req, res) {
    const users = await User.find({}).sort('name');
    res.render('cats/new', { users, title: 'Add a Cat', errorMsg: '' });
}

async function show(req, res) {
    const loggedInUserRole = req.user.role;
    const cat = await Cat.findById(req.params.id);
    const users = await User.find({}).sort('name');
    const vets = await Vet.find({}).sort('name');
    const appts = await Appt.find({ cat: req.params.id }).populate('vet');
    const loggedInUserId = req.user._id;
    const currentUser = await User.find({
        _id: cat.carer,
    });
    const currentUserId = currentUser[0]._id;
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
        title: `${cat.name}`,
        cat,
        fosterCarerName,
        vets,
        appts,
        loggedInUserId,
        currentUserId,
        loggedInUserRole,
        errorMsg: '',
    });
}

async function create(req, res) {
    const users = await User.find({}).sort('name');
    req.body.vaccinated = !!req.body.vaccinated;
    req.body.desexed = !!req.body.desexed;
    req.body.age = calculateKittenAge(req.body.birthDate);
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    try {
        const cat = await Cat.create(req.body);
        res.redirect(`/cats/${cat._id}`);
    } catch (err) {
        console.log(err);
        res.render('cats/new', {
            users,
            title: 'Add a Cat',
            errorMsg: err.message,
        });
    }
}

async function edit(req, res) {
    const loggedInUserId = req.user._id;
    const loggedInUserRole = req.user.role;
    const cat = await Cat.findById(req.params.id);
    const users = await User.find({}).sort('name');
    const currentUser = await User.find({
        _id: cat.carer,
    });
    const currentUserName = currentUser[0].name;
    const currentUserId = currentUser[0]._id;
    let intakeDate = cat.intake;
    let birthDate = cat.birthDate;
    let adoptDate = cat.adoptDate;
    intakeDate = intakeDate !== undefined ? formatDate(intakeDate) : undefined;
    birthDate = birthDate !== undefined ? formatDate(birthDate) : undefined;
    adoptDate = adoptDate !== undefined ? formatDate(adoptDate) : undefined;
    if (
        loggedInUserId.toString() === currentUserId.toString() ||
        loggedInUserRole === 'Admin'
    ) {
        res.render('cats/edit', {
            cat,
            title: `Edit ${cat.name}`,
            intakeDate,
            birthDate,
            adoptDate,
            users,
            currentUserName,
            loggedInUserId,
            currentUserId,
            errorMsg: '',
        });
    } else res.redirect(`/cats`);
}

async function update(req, res) {
    const cat = await Cat.findById(req.params.id);
    req.body.vaccinated = !!req.body.vaccinated;
    req.body.desexed = !!req.body.desexed;
    req.body.adopted = !!req.body.adopted;
    try {
        const result = await Cat.updateOne(
            { _id: req.params.id },
            {
                $set: req.body,
            }
        );
        res.redirect(`/cats/${cat._id}`);
    } catch (err) {
        console.log(err);
        res.render('error', err);
    }
}

async function remove(req, res) {
    try {
        const result = await Cat.deleteOne({ _id: req.params.id });
        res.redirect('/cats');
    } catch (err) {
        console.log(err);
        res.render('error', err);
    }
}

module.exports = {
    index,
    indexAdoptable,
    indexInCare,
    indexAdopted,
    show,
    new: newCat,
    create,
    edit,
    update,
    delete: remove,
};

// Other functions to help with the above

// Calculate Age
function calculateKittenAge(birthDate) {
    if (!birthDate) {
        return null;
    }
    const currentDate = new Date();
    const birthDateObj = new Date(birthDate);
    const ageInMilliseconds = currentDate - birthDateObj;
    const ageInYears = ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000);
    const ageInMonths = ageInYears * 12;
    const ageInDays = ageInMilliseconds / (24 * 60 * 60 * 1000);
    if (ageInYears >= 1) {
        return `${Math.floor(ageInYears)} years`;
    } else if (ageInMonths >= 1) {
        return `${Math.floor(ageInMonths)} months`;
    } else {
        return `${Math.floor(ageInDays)} days`;
    }
}

// Convert the date object into the right string format to be passed in to as a value for the edit page
function formatDate(date) {
    if (date !== null) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
}
