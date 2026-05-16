"use strict";

const express = require("express");
const router = express.Router();
const db = require("../models/db");

// Endpoint för att hämta öppentider
router.get("/", (req, res) => {
    const sql = "SELECT * FROM opening_hours";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Fel vid hämtning av öppentider: " + err);
            res.status(500).json({ error: "Fel vid hämtning av öppentider" });
        } else {
            res.json(results);
        }
    })
});

module.exports = router;