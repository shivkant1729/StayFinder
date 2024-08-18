const mongoose = require('mongoose');
const Place = require('../models/Place');
const jwt = require('jsonwebtoken')

const place = (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const { token } = req.cookies;
    const {
        title, address, addedPhotos, description, price,
        perks, extraInfo, checkIn, checkOut, maxGuests,
    } = req.body;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
            owner: userData.id, price,
            title, address, photos: addedPhotos, description,
            perks, extraInfo, checkIn, checkOut, maxGuests,
        });
        res.json(placeDoc);
    });
}
module.exports = { place };