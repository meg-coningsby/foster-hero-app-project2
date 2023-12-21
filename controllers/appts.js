const Cat = require('../models/cat');
const Appt = require('../models/appt');
const Vet = require('../models/vet');

async function index(req, res) {
    const appts = await Appt.find({})
        .populate('vet')
        .populate({
            path: 'cat',
            populate: { path: 'carer' },
        })
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

async function edit(req, res) {
    const appt = await Appt.findById(req.params.id);
    const vets = await Vet.find({}).sort('name');
    const currentVet = await Vet.find({
        _id: appt.vet,
    });
    const currentVetName = currentVet[0].name;
    let apptDate = appt.date;
    apptDate = formatDate(apptDate);
    res.render('appts/edit', {
        title: `Edit Appt`,
        appt,
        vets,
        currentVetName,
        apptDate,
        errorMsg: '',
    });
}

async function remove(req, res) {
    try {
        const deleteAppt = await Appt.deleteOne({ _id: req.params.id });
        res.redirect('/appts');
    } catch (err) {
        console.log(err);
        res.redirect('/appts');
    }
}

module.exports = {
    index,
    create,
    edit,
    delete: remove,
};

// Other functions to help with the above

// Convert the date object into the right string format to be passed in to as a value for the edit page
function formatDate(date) {
    if (date !== null) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
}
