const route = require('express').Router();
const { login, register } = require('../services/authService');
const Announced = require('../models/announced');
const User = require('../models/user');

route.get('/all', async (req, res) => res.send(await Announced.find()));

route.get('/lastAds', async (req, res) => res.send(await Announced.find().sort({ _id: -1 }).limit(5).lean()));

/* res.send(await Announced.find().sort({ _id: 1 }).limit(5).lean()) */

route.get('/undefined', (req, res) => res.status(200).send({}));

route.get('/ad/edit/:id', async (req, res) => res.send(await Announced.findOne({ title: req.params.id })));

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

route.get('/details/:id', async (req, res) => res.send(await Announced.findById(req.params.id)));

route.post('/adding/image', (req, res) => {

    const file = req.files.file;

    file.mv('./src/uploadFile/' + file.name);

    res.status(200).send({})

});

route.post('/adding/data', async (req, res) => res.status(200).send(await Announced.create(req.body)));

route.post('/edit/pic', (req, res) => {

    const file = req.files.file;

    file.mv('./src/uploadFile/' + file.name);

    res.status(200).send({})

});

route.post('/edit/data', async (req, res) => {

    await Announced.findByIdAndUpdate(req.body._id, req.body);

    res.status(200).send({})

});

route.post('/edit/myAd/:owner', async (req, res) => {

    const user = await User.findById(req.params.owner);

    const data = req.body;

    const newState = user.ownAds.map(obj => {

        if (obj._id === req.body._id) {

            return {
                ...obj,
                title: data.title,
                category: data.category,
                description: data.description,
                location: data.location,
                phone: data.phone,
                price: data.price,
                image: data.image
            };
        }

        return obj;
    });

    user.ownAds = newState;

    user.save();

    res.status(200).send({})

});

route.post('/sendMessage', async (req, res) => {

    const messageData = req.body;

    const user = await User.findById(messageData.recipient);

    const myMessage = await User.findById(messageData.sender);

    user.messages.push(messageData);

    myMessage.messages.push(messageData);

    myMessage.save();

    user.save();

    res.status(200).send({})

});

route.get('/messages/:id', async (req, res) => {

    const messages = await User.findById(req.params.id);

    res.send(messages.messages).status(200);
});

route.post('/answerMessage', async (req, res) => {

    const messageData = req.body;

    const user = await User.findById(messageData.recipient);

    user.messages.push(messageData);

    const myMessage = await User.findById(messageData.sender);

    myMessage.messages.push(messageData);

    myMessage.save();

    user.save();

    res.send().status(200);

});

route.post('/deleteMessage', async (req, res) => {

    const messageData = await User.findById(req.body.user);

    const newArr = messageData.messages.filter(messages => {

        return messages.message !== req.body.message;
    });

    messageData.messages = newArr;

    messageData.save();

    res.send().status(200);

});


route.get('/adDelete/:id', async (req, res) => res.status(200).send(await Announced.findByIdAndRemove(req.params.id)));

route.get('/delete/myAd/:id/:ownerId', async (req, res) => {

    const user = await User.findById(req.params.ownerId);

    const newArr = user.ownAds.filter(fav => {

        return String(fav._id) !== req.params.id;
    });

    user.ownAds = newArr;

    user.save();

    res.status(200).send({});

});


route.get('/addFav/:title/:id', async (req, res) => {

    const user = await User.findById(req.params.id);

    user.favorite.push(req.params.title);

    user.save();

    res.status(200).send({})
});

route.get('/fav/:id', async (req, res) => {

    const data = await User.findById(req.params.id).populate('favorite');

    res.send(data.favorite).status(200);
})

route.get('/removeFav/:id/:user', async (req, res) => {

    const user = await User.findById(req.params.user)

    const newArr = user.favorite.filter(fav => {

        return String(fav) !== req.params.id;
    });

    user.favorite = newArr;

    user.save();

    res.send().status(200);

});

route.post('/my/ads', async (req, res) => {

    const data = req.body;

    const user = await User.findById(data.owner);

    user.ownAds.push(data);

    user.save();

    res.status(200).send({})

});

route.get('/myAds/:id', async (req, res) => {

    const user = await User.findById(req.params.id);

    res.send(user.ownAds).status(200);

});

route.get('/ads/:category', async (req, res) => {

    if (req.params.category === 'all') {

        res.status(200).send(await Announced.find());

    } else {

        res.status(200).send(await Announced.find({ category: req.params.category }));
    }

});

module.exports = route;