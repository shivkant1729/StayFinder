// controllers/profile.js
const profile = (req, res) => {
    res.json(req.user); // This will send user information stored in req.user
};

module.exports = { profile };
