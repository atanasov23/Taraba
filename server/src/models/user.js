const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    favorite: [{
        type: mongoose.Types.ObjectId,
        ref: ['announced']
    }],
    ownAds: [{
        type: mongoose.Types.ObjectId,
        ref: ['announced']
    }],
    messages: [{
        type: Object
    }]
   
})

const User = mongoose.model('User', userSchema);

module.exports = User;