const Cat = require('../models/cat');

module.exports = {
    create,
};

async function create(req, res) {
    const cat = await Cat.findById(req.params.id);
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    cat.notes.push(req.body);
    try {
        await cat.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect(`/cats/${cat._id}`);
}
