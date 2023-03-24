const mongoose = require('mongoose');

const announced = new mongoose.Schema({

    title: {
        type: String
    },
    category: {
        type: String
    },
    description: {
        type: String
    },
    location: {
        type: String
    },
    phone: {
        type: String
    },
    owner: {
        type: mongoose.Types.ObjectId
    },
    price: {
        type: String
    },
    image: {
        type: String
    }

});

const Announced = mongoose.model("Announced", announced);

module.exports = Announced;