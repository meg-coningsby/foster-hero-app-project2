const Vet = require('../models/vet');
const Appt = require('../models/appt');

async function index(req, res) {
    const vets = await Vet.find({}).sort('name');
    res.render('vets/index', { title: 'All Vets', vets });
}

async function show(req, res) {
    const vet = await Vet.findById(req.params.id);
    const appts = await Appt.find({ vet: req.params.id }).populate('cat');
    res.render('vets/show', { title: `${vet.name}`, vet, appts });
}

module.exports = {
    index,
    show,
};
