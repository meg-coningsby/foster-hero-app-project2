const Cat = require('../models/cat');
const Appt = require('../models/appt');

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
        res.render('cats/index', { errorMsg: err.message });
    }
}

module.exports = {
    create,
};
