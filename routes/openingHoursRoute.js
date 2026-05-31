"use strict";

const express = require("express");
const router = express.Router();
const db = require("../models/db");
const auth = require("../middleware/authMiddleware");

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

// Skyddad route för att uppdatera öppettider
router.put("/:id", auth, (req, res) => {
    const {weekday, open_time, close_time, is_closed} = req.body;
    const sql = `UPDATE opening_hours SET weekday=?, open_time=?, close_time=?, is_closed=? WHERE hours_id=?`;

    db.query(
        sql, [weekday, open_time, close_time, is_closed, req.params.id],
        (err) => {
            if(err) {
                return res.status(500).json(err);
            }
            res.json({
                message: "Öppettider uppdaterade"
            });
        }
    );
});

// Endpoint för att hämta öppettider
router.get("/", (req, res) => {
    const sql = `SELECT * FROM opening_hours`;

    db.query(sql, (err, result) => {
        if(err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

module.exports = router;