const asyncHandler = require('express-async-handler');
const User = require('../models/User.model.js');
const jwt = require('jsonwebtoken');

const ProtectMiddleware = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        res.status(401);
        throw new Error('Provide the authorization token first');
        
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;
        
        const user = await User.findById(userId).select('-password');

        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }

        req.user = user;
        next();
    } catch (err) {
        console.error('Token verification error:', err);
        res.status(401);
        throw new Error('Invalid token');
    }
});

const AuthMiddleware = (...roles) =>
    asyncHandler(async (req, res, next) => {
        const userRole = req.user.role;

        if (!roles.includes(userRole)) {
            res.status(403);
            throw new Error('Not authorized to access this route');
        }

        next();
    });

module.exports = { ProtectMiddleware, AuthMiddleware };
