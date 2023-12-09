const Vet = require('../models/vet');
const Appt = require('../models/appt');

async function index(req, res) {
    const vets = await Vet.find({});
    res.render('vets/index', { title: 'All Vets', vets });
}

async function show(req, res) {
    const vet = await Vet.findById(req.params.id);
    const appts = await Appt.find({ vet: req.params.id }).populate('cat');
    console.log(appts);
    res.render('vets/show', { title: `Vet Details`, vet, appts });
}

module.exports = {
    index,
    show,
};
