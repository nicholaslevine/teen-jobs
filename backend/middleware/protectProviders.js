const prisma = require('../db/prisma');
const jwt = require('jsonwebtoken');
require('dotenv').config();


async function protect(req, res, next){
    try {
        const token = req.cookies.jwt;

        if (!token){
            return res.status(404).json({error: "Unathorized"});
        };

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const provider = await prisma.provider.findUnique({
            where: {
                id: decoded.providerId
            },
            select: {
                id: true,
                name: true,
                username: true,
                jobs: true,
                description: true,
            }
        });

        if (!provider) {
            return res.status(404).json({error: "User not found"});
        }

        req.user = user;
        next();
        
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError){
            res.status(401).json({error: "Unathorized, Token Expired"});
            next(error);
        }
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({error: "Invalid Token"});
            next(error);
        }
        console.error("Error protecting users", error);
        res.status(500).json({error: "Iternal server error"});
        next(error);
    }
}

module.exports = protect;