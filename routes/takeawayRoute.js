"use strict";

const express = require("express");
const router = express.Router();
const db = require("../models/db");

// Endpoint för att hämta takeaway beställningar
router.get("/", (req, res) => {
    const sql = `
    SELECT
        takeaway_orders.order_id,
        takeaway_orders.name,
        takeaway_orders.phone_number,
        takeaway_orders.pickup_time,
        takeaway_orders.total_price,

        menu_items.title,
        takeaway_order_items.quantity

    FROM takeaway_orders

    JOIN takeaway_order_items
        ON takeaway_orders.order_id =
        takeaway_order_items.order_id

    JOIN menu_items
        ON takeaway_order_items.item_id =
        menu_items.item_id

    ORDER BY takeaway_orders.pickup_time ASC
`;

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