const route = require('express').Router();
const { login, register } = require('../services/authService');
const Announced = require('../models/announced');
const User = require('../models/user');

route.get('/all', async (req, res) => res.send(await Announced.find()));

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

})

route.post('/adding/data', async (req, res) => res.status(200).send(await Announced.create(req.body)));

route.post('/edit/pic', (req, res) => {

    const file = req.files.file;

    file.mv('./src/uploadFile/' + file.name);

    res.status(200).send({})

})

route.post('/edit/data', async (req, res) => {

    await Announced.findByIdAndUpdate(req.body._id, req.body);

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

})

route.get('/messages/:id', async (req, res) =>  res.send(await User.findById(req.params.id).messages));

route.post('/answerMessage', async (req, res) => {

    const messageData = req.body;

    const user = await User.findById(messageData.recipient);

    user.messages.push(messageData);

    const myMessage = await User.findById(messageData.sender);

    myMessage.messages.push(messageData);

    myMessage.save();

    user.save();

})

route.post('/deleteMessage', async (req, res) => {

    const messageData = await User.findById(req.body.user);

    const newArr = messageData.messages.filter(messages => {

        return messages.message !== req.body.message;
    });

    messageData.messages = newArr;

    messageData.save();

});


route.get('/adDelete/:id', async (req, res) => res.status(200).send(await Announced.findByIdAndRemove(req.params.id)));


route.get('/addFav/:title/:id', async (req, res) => {

    const user = await User.findById(req.params.id);

    user.favorite.push(req.params.title);

    user.save();
})

route.get('/fav/:id', async (req, res) => res.send(await User.findById(req.params.id).populate('favorite').favorite));

route.get('/removeFav/:id/:user', async (req, res) => {

    const user = await User.findById(req.params.user)

    const newArr = user.favorite.filter(fav => {

        return String(fav) !== req.params.id;
    });

    user.favorite = newArr;

    user.save();

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

})

module.exports = route;