const Cat = require('../models/cat');

module.exports = {
    create,
    delete: deleteNote,
};

async function create(req, res) {
    const cat = await Cat.findById(req.params.id);
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    cat.notes.push(req.body);
    try {
        await cat.save();
        res.redirect(`/cats/${cat._id}`);
    } catch (err) {
        console.log(err);
        res.redirect(`/cats/${cat._id}`);
    }
}

async function deleteNote(req, res) {
    const cat = await Cat.findOne({
        'notes._id': req.params.id,
        'notes.user': req.user._id,
    });
    if (!cat) return res.redirect('/cats');
    cat.notes.remove(req.params.id);
    await cat.save();
    res.redirect(`/cats/${cat._id}`);
}
