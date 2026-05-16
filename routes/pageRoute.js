"use strict";

const express = require("express");
const router = express.Router();
const db = require("../models/db");

// Endpoint för att hämta infomration om resturangen/företaget
router.get("/", (req, res) => {
    const sql = "SELECT * FROM pages";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Fel vid hämtning av information: " + err);
            res.status(500).json({ error: "Fel vid hämtning av information" });
        } else {
            res.json(results);
        }
    })
});

module.exports = router;