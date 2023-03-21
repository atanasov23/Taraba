const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'kfdr456kfesawdlpaf231213132l';

const register = async (userData) => {

    if (await User.findOne({ username: userData.username })) {

        return true;

    } else {

        const cryptPassword = await bcrypt.hash(userData.password, 10);

        await User.create({
            username: userData.username,
            password: cryptPassword,
            email: userData.email
        });
    }
}

const login = async (loginData, res) => {

    if (!await User.findOne({ username: loginData.username })) {

        return true;

    } else {

        const user = await User.findOne({ username: loginData.username });

        const password = await bcrypt.compare(loginData.password, user.password);

        if (!password) {

            return true;
        }

        const payloads = {
            _id: user._id,
            username: user.username,
            email: user.email,
        }

        const token = jwt.sign(payloads, secret, { expiresIn: "2d"} );

        res.status(200).json({
            login: true,
            token: token
        });

    }

}

module.exports = {

    register,
    login
}