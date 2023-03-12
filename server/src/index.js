const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const routes = require('./routes/routes');

try {

    mongoose.connect('mongodb://localhost:27017/taraba');

    console.log('Connected to the base');

    const server = express();

    server.use(cors());

    server.use(fileUpload());

    server.use(express.urlencoded({ extended: false }));

    server.use(express.json());

    server.use(express.static('public'));

    server.use(routes);

    server.listen(1000, () => console.log('The server is started'));

} catch (err) {

    console.log(err);

}




