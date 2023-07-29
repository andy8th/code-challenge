const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findByPk(decoded.id);
        console.log("User:", req.user);
        next();
    } catch (error) {
        console.log("Error:", error); 
        res.status(401).json({ message: 'Authentication failed.' });
    }
};

module.exports = authMiddleware;
