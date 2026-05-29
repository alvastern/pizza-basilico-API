"use strict";

const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({
            message: "Ingen token"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        console.log("TOKEN:", token);
        console.log("SECRET:", process.env.JWT_SECRET);
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