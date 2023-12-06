const Cat = require('../models/cat');
const User = require('../models/user');

async function index(req, res) {
    const cats = await Cat.find({});
    res.render('cats/index', { title: 'All Cats', cats });
}

function newCat(req, res) {
    res.render('cats/new', { title: 'Add a Cat', errorMsg: '' });
}

async function show(req, res) {
    // I'll need to populate the carer and vet appts docs instead of ObjectIds
    const cat = await Cat.findById(req.params.id);
    res.render('cats/show', { title: `Cat Details`, cat });
}

async function create(req, res) {
    req.body.vaccinated = !!req.body.vaccinated;
    req.body.desexed = !!req.body.desexed;
    req.body.adopted = !!req.body.adopted;
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

module.exports = {
    index,
    show,
    new: newCat,
    create,
};
