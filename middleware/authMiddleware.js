"use strict";

// Middleware för autentisering av användare
const jwt = require("jsonwebtoken");

// Funktion för att kontrollera en användare genom att verifiera en JWT-token
function auth(req, res, next) {
    const authHeader = req.headers.authorization;

    // Om ingen tokens finns i headern
    if(!authHeader) {
        return res.status(401).json({
            message: "Ingen token"
        });
    }

    const token = authHeader.split(" ")[1];

    // Try/catch för att verifiera token och hantera fel
    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: "Ogiltig token"
        });

    }
}

module.exports = auth;