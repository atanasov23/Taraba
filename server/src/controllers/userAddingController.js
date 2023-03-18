const route = require('express').Router();
const Announced = require('../models/announced');

route.post('/ad', (req, res) => {

    const files = req.files.file;

    if (Array.from(files).length === 0) {

        files.mv('./src/uploadFile/' + files.name);

    } else {

        files.map(file => {

            file.mv('./src/uploadFile/' + file.name);

        });
    }
})

route.post('/pictures', (req, res) => {

    Announced.create(req.body);
})

module.exports = route;