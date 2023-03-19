const route = require('express').Router();
const Announced = require('../models/announced');

const data = new Announced();

route.post('/ad', (req, res) => {

    const files = req.files.file;

    if (Array.from(files).length === 0) {

        files.mv('./src/uploadFile/' + files.name);

        data.pictures.push(file.name);

    } else {

        files.map(file => {

            file.mv('./src/uploadFile/' + file.name);

            data.pictures.push(file.name);
        });
    }
})

route.post('/pictures', (req, res) => {

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