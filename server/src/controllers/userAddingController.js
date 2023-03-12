const route = require('express').Router();

route.post('/ad', (req, res) => {

    const files = req.files.file;

    files.map(file => {

        file.mv('./src/uploadFile/' + file.name);

    });
})

module.exports = route;