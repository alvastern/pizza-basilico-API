"use strict";

const express = require("express");
const router = express.Router();
const db = require("../models/db");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Route för registrering
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
    INSERT INTO users(username, email, password)
    VALUES (?, ?, ?)
    `;

    db.query(sql, [username, email, hashedPassword], (err) => {
        if(err) {
            return res.status(500).json(err);
        }
        res.json({ message: "Användare skapad" });
    });
});

// Route för att logga in
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, results) => {
        if(err) {
            return res.status(500).json(err);
        }

        if(results.length === 0) {
            return res.status(401).json({
                message: "Fel användare"
            });
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if(!match) {
            return res.status(401).json({
                message: "Fel lösenord"
            });
        }

        const token = jwt.sign(
            { id: user.user_id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });
    });
});

module.exports = router;