const Cat = require('../models/cat');
const Appt = require('../models/appt');
const Vet = require('../models/vet');

async function index(req, res) {
    let appts = await Appt.find({})
        .populate('cat')
        .populate('vet')
        .sort({ date: -1 });
    res.render('appts/index', { title: 'All Vet Appts', appts });
}

async function create(req, res) {
    const cat = await Cat.findById(req.params.id);
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    try {
        const appt = await Appt.create(req.body);
        appt.cat = req.params.id;
        await appt.save();
        res.redirect(`/cats/${cat._id}`);
    } catch (err) {
        console.log(err);
        res.redirect(`/cats/${cat._id}`);
    }
}

module.exports = {
    index,
    create,
};
