"use strict";

const express = require("express");
const router = express.Router();
const db = require("../models/db");


// Hämta bokningar för specifikt datum
router.get("/date/:date", (req, res) => {
    const selectedDate = req.params.date;
    const sql = `SELECT booking_id, name, email, phone_number, guest_number, DATE_FORMAT(booking_date, '%Y-%m-%d') AS booking_date, booking_time FROM table_bookings WHERE booking_date = ?`;

    db.query(
        sql, [selectedDate], (err, results) => {
            if(err) {
                return res.status(500).json(err);
            }
            res.json(results);
        }
    );
});

// Skapa ny bokning
router.post("/", (req, res) => {
    const {name, email, phone_number, guest_number, booking_date, booking_time} = req.body;
    const sql = `INSERT INTO table_bookings(name, email, phone_number, guest_number, booking_date, booking_time) VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(
        sql, [name, email, phone_number, guest_number, booking_date, booking_time], (err) => {
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