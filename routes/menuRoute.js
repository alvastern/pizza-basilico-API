"use strict";

const express = require("express");
const router = express.Router();
const db = require("../models/db");

// Endpoint för att hämta alla menyalternativ
router.get("/", (req, res) => {
    const sql = "SELECT * FROM menu_items";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Fel vid hämtning av meny: " + err);
            res.status(500).json({ error: "Fel vid hämtning av meny" });
        } else {
            res.json(results);
        }
    })
});

module.exports = router;