"use strict";

const express = require("express");
const router = express.Router();
const db = require("../models/db");

// Endpoint för att hämta bordsbokningar
router.get("/", (req, res)=> {
    const sql = "SELECT * FROM bookings";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Fel vid hämtning av bordsbokningar: " + err);
            res.status(500).json({ error: "Fel vid hämtning av bordsbokningar" });
        } else {
            res.json(results);
        }
    })
});

module.exports = router;