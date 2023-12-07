const Vet = require('../models/vet');
const Appt = require('../models/appt');

async function index(req, res) {
    const vets = await Vet.find({});
    res.render('vets/index', { title: 'All Vets', vets });
}

async function show(req, res) {
    // I'll need to populate the vet appt docs instead of ObjectIds
    const vet = await Vet.findById(req.params.id);
    res.render('vets/show', { title: `Vet Details`, vet });
}

module.exports = {
    index,
    show,
};
