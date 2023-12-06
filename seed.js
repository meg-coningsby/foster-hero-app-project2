require('dotenv').config();
require('./config/database');

const Cat = require('./models/cat');
const User = require('./models/user');
const Vet = require('./models/vet');

const data = require('./data');

(async function () {
    const p1 = Cat.deleteMany({});
    const p2 = User.deleteMany({});
    const p3 = Vet.deleteMany({});

    let results = await Promise.all([p1]);

    console.log(results);

    results = await Promise.all([
        Cat.create(data.cats),
        User.create(data.users),
        Vet.create(data.vets),
    ]);
    console.log('Created cats:', results[0]);
    console.log('Created users:', results[1]);
    console.log('Created vets:', results[2]);
    process.exit();
})();
