const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateProviderToken(providerId, res) {
    const token = jwt.sign({providerId}, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });

    res.cookie("jwt", token, {
        maxAge: 24*60*60*1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })
};

module.export = generateProviderToken;