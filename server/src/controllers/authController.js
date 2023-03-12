const route = require('express').Router();
const { login, register } = require('../services/authService');

route.post('/register', async (req, res) => {

    /* console.log(req.body); */

    if (await register(req.body)) {

        res.status(200).json({ response: "Username is already exist!" });

    } else {

        res.status(200).json({ register: true });
    }
});

route.post('/login', async(req, res) => {
    

    if (await login(req.body, res)) {

        res.status(200).json({ response: "Username or password is incorrect" });

    }/*  else {

        res.status(200).json({ login: true });
    } */

});

module.exports = route;