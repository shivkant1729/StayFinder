const User = require('../models/User');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user document
        const userDoc = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // Send the response excluding the password
        res.send({ userDoc });
    } catch (error) {
        // Handle any errors that occur during the registration process
        res.status(500).send({ error: 'Error registering user' });
    }
};

module.exports = { register };
