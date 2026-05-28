"use strict";

const express = require("express");
const router = express.Router();
const db = require("../models/db");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Använder post för att registrera en ny användare
router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    // Validering av tomma fält
    if(!email || !password) {
        return res.status(400).json({
            message: "Alla fält måste fyllas i"
        });
    }

    // Validering av email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email)) {
        return res.status(400).json({
            message: "Ogiltig e-postadress"
        });
    }

    // Validering av lösenord
    if(password.length < 6) {
        return res.status(400).json({
            message: "Lösenordet måste vara minst 6 tecken"
        });
    }

    // Kontrollera om email redan finns
    const checkUserSql = "SELECT * FROM users WHERE email = ?";

    db.query(
        checkUserSql,
        [email],

        async (err, results) => {
            if(err) {
                return res.status(500).json(err);
            }

            if(results.length > 0) {
                return res.status(409).json({
                    message: "E-postadressen används redan"
                });
            }

            // Hashar lösenordet och sparar som klartext i databasen
            try {
                const hashedPassword =
                    await bcrypt.hash(password, 10);

                const sql = `
                    INSERT INTO users
                    (email, password)
                    VALUES (?, ?)
                `;

                db.query(
                    sql, [email, hashedPassword],

                    (err) => {
                        if(err) {
                            return res
                            .status(500)
                            .json(err);
                        }

                        res.status(201).json({
                            message: "Användare skapad"
                        });
                    }
                );

            } catch(error) {
                return res.status(500).json(error);
            }
        }
    );
});

// Använder post för att logga in en användare
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Validering tomma fält
    if(!email || !password) {
        return res.status(400).json({
            message: "Alla fält måste fyllas i"
        });
    }

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(
        sql, [email],

        async (err, results) => {
            if(err) {
                return res.status(500).json(err);
            }

            // Kontrollerar om användaren finns i databasen
            if(results.length === 0) {
                return res.status(401).json({
                    message: "Fel e-postadress eller lösenord"
                });
            }

            const user = results[0];

            const match =
                await bcrypt.compare(
                    password,
                    user.password
                );


            // Om lösenordet inte matchar returneras ett felmeddelande
            if(!match) {
                return res.status(401).json({
                    message: "Fel e-postadress eller lösenord"
                });
            }

            // Skapaer en JWT-token som är giltig i 1 timme
            const token = jwt.sign(
                { id: user.user_id },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            res.json({
                message: "Inloggning lyckades",
                token
            });
        }
    );
});

module.exports = router;