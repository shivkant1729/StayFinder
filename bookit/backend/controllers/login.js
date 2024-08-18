const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        const validate = await bcrypt.compare(password, user.password);
        if (!validate) {
            return res.status(400).send('Password not valid');
        }

        jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, {}, (err, token) => {
            if (err) {
                // console.log(err);
                throw err;
            }

            res.cookie('token', token, { httpOnly: true }).json(user);
        });
    } catch (error) {
        // console.error(error);
        res.status(500).send({ error: 'Error logging in' });
    }
};

module.exports = { login };
