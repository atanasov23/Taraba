const route = require('express').Router();
const { login, register } = require('../services/authService');
const Announced = require('../models/announced');
const data = new Announced();

route.get('/', async (req, res) => {

    const ad = await Announced.find();

    res.send(ad);
});

route.post('/user/register', async (req, res) => {

    if (await register(req.body)) {

        res.status(200).json({ response: "Username is already exist!" });

    } else {

        res.status(200).json({ register: true });
    }
});

route.post('/user/login', async (req, res) => {


    if (await login(req.body, res)) {

        res.status(200).json({ response: "Username or password is incorrect" });

    }

});

route.get('/details/:id', async (req, res) => {

    const adData = await Announced.findById(req.params.id);

    res.send(adData);

});

route.post('/adding/ad', (req, res) => {

    const files = req.files.file;

    if (Array.from(files).length === 0) {

        files.mv('./src/uploadFile/' + files.name);

        data.pictures.push(files.name);

    } else {

        files.map(file => {

            file.mv('./src/uploadFile/' + file.name);

            data.pictures.push(file.name);
        });
    }
})

route.post('/adding/pictures', (req, res) => {

    const userData = req.body;

    data.title = userData.title;
    data.category = userData.category;
    data.description = userData.description;
    data.location = userData.location;
    data.phone = userData.phone;
    data.owner = userData.owner;
    data.price = userData.price;

    data.save();
})


module.exports = route;