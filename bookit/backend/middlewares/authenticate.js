// middleware/authenticate.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = (req, res, next) => {
    const token = req.cookies.token;
    // console.log('1');
    if (!token) {
        return res.status(401).json({ message: 'Authorization failed: No token provided' });
    }
    // console.log('2');

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Authorization failed: Invalid token' });
        }
        // console.log('3');

        // If token is valid, find user in database and attach to req.user
        User.findById(decoded.id)
            .then(user => {
                if (!user) {
                    return res.status(401).json({ message: 'Authorization failed: User not found' });
                }
                // console.log('4');

                req.user = user;
                // console.log('5');

                next();
            })
            .catch(err => {
                console.error('Error finding user:', err);
                res.status(500).json({ message: 'Internal server error' });
            });
    });
};

module.exports = authenticate;
