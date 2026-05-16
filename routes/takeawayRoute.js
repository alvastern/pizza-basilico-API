"use strict";

const express = require("express");
const router = express.Router();
const db = require("../models/db");

// Endpoint för att hämta takeaway beställningar
router.get("/", (req, res) => {
    const sql = "SELECT * FROM takeaway_orders";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Fel vid hämtning av takeaway beställningar: " + err);
            res.status(500).json({ error: "Fel vid hämtning av takeaway beställningar" });
        } else {
            res.json(results);
        }
    })
});

module.exports = router;