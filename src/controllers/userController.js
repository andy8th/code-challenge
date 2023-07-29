const bcrypt = require('bcrypt');
const User = require('../models/user');
const generateToken = require('../utils/generateToken');

exports.register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            status: 'success',
            data: {
                user
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user with requested email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'No user found with this email.' });
        }

        // Compare passwords
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Incorrect password.' });
        }

        // Sign JWT
        const token = generateToken(user.id);

        res.status(200).json({ status: 'success', token });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};
