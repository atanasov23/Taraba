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
        ref: ['Announced']
    }],
    ownAds: [{
        type: Object
    }],
    messages: [{
        type: Object
    }]
   
})

const User = mongoose.model('User', userSchema);

module.exports = User;