const route = require('express').Router();
const Announced = require('../models/announced');

route.get('/', async (req, res) => {

    const ad = await Announced.find();

    res.send(ad);
});

route.get('/ad/details/:id', async (req, res) => {
    
    const adData = await Announced.findById(req.params.id);

    res.send(adData);

});

route.get('/uploadFile', (req, res) => {

    res.send('daadadaddadad');

})



module.exports = route;