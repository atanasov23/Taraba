const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const routes = require('./routes/routes');
const timeout = require('connect-timeout')

try {

    mongoose.connect('mongodb://127.0.0.1:27017/taraba');

    console.log('Connected to the base');

    const server = express();

    server.use(timeout('3s'))

    server.use(express.static('src/uploadFile'));

    server.use(cors());

    server.use(fileUpload());

    server.use(express.urlencoded({ extended: false }));

    server.use(express.json());

    server.use(routes);

    server.listen(1000, () => console.log('The server is started'));

} catch (err) {

    console.log(err);

}




