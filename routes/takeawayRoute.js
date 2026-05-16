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

router.post("/", (req, res) => {
    const {name, email, phone_number, pickup_time, total_price} = req.body;
    const sql = `INSERT INTO takeaway_orders (name, email, phone_number, pickup_time, total_price) VALUES (?, ?, ?, ?, ?)`;

    db.query(
        sql, [name, email, phone_number, pickup_time, total_price],
        (err) => {
            if(err) {
                return res.status(500).json(err);
            }
            res.json({
                message: "Order skapad"
            });
        }
    );
});

module.exports = router;