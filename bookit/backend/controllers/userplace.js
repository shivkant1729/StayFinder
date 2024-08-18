const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Place = require('../models/Place')
const userplace = (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const { token } = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
        const { id } = userData;
        res.json(await Place.find({ owner: id }));
    });
};
module.exports = { userplace };