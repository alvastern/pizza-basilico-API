"use strict";

const express = require("express");
const router = express.Router();
const db = require("../models/db");

// Endpoint för att hämta bordsbokningar
router.get("/", (req, res)=> {
    const sql = "SELECT * FROM table_bookings";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Fel vid hämtning av bordsbokningar: " + err);
            res.status(500).json({ error: "Fel vid hämtning av bordsbokningar" });
        } else {
            res.json(results);
        }
    })
});

router.post("/", (req, res) => {
    const {name, email, phone_number, guest_number, booking_date, booking_time} = req.body;
    const sql = `INSERT INTO table_bookings (name, email, phone_number, guest_number, booking_date, booking_time) VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(
        sql, [name, email, phone_number, guest_number, booking_date, booking_time],
        (err) => {
            if(err) {
                return res.status(500).json(err);
            }
            res.json({
                message: "Bokning skapad"
            });
        }
    );
});

module.exports = router;