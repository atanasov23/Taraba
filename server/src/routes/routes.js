const route = require('express').Router();
const { login, register } = require('../services/authService');
const Announced = require('../models/announced');
const User = require('../models/user');
const data = new Announced();

/* const user = new User(); */

route.get('/', async (req, res) => {

    const ad = await Announced.find();

    res.send(ad);
});

route.get('/ad/edit/:id', async (req, res) => {

    const ad = await Announced.findById(req.params.id);

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

    const test = await Announced.find({ owner: '640dfee3490da134b831aa1e' })

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


route.post('/edit/ad', (req, res) => {

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

route.post('/edit/pictures', (req, res) => {

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

route.post('/sendMessage', async (req, res) => {

    const messageData = req.body;

    console.log(messageData);

    const user = await User.findById(messageData.recipient);

    user.messages.push(messageData);

    user.save();
})

route.get('/messages/:id', async (req, res) => {

    const user = await User.findById(req.params.id);

    res.send(user.messages);
})

route.post('/answerMessage', async (req, res) => {

    const messageData = req.body;

    console.log(messageData.recipient);

    const user = await User.findById(messageData.recipient);

    user.messages.push(messageData);

    user.save();
})

module.exports = route;