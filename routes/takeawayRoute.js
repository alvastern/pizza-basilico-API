"use strict";

const express = require("express");
const router = express.Router();
const db = require("../models/db");
const auth = require("../middleware/authMiddleware");


// Route för att hämta alla aktiva takeaway-beställningar
router.get("/", auth,(req, res) => {
    const sql = `SELECT takeaway_orders.order_id, takeaway_orders.name, takeaway_orders.phone_number, takeaway_orders.pickup_time, GROUP_CONCAT(CONCAT(takeaway_order_items.quantity,'x ', menu_items.title) SEPARATOR ', ') AS items FROM takeaway_orders JOIN takeaway_order_items ON takeaway_orders.order_id = takeaway_order_items.order_id JOIN menu_items ON takeaway_order_items.item_id = menu_items.item_id WHERE takeaway_orders.is_completed = FALSE GROUP BY takeaway_orders.order_id ORDER BY takeaway_orders.pickup_time ASC`;

    db.query(sql, (err, results) => {
        if(err) {
            return res.status(500).json(err);
        }

        res.json(results);
    });
});

// Route för att skapa en ny takeaway-beställning
router.post("/", (req, res) => {
    const {name, email, phone_number, pickup_time, total_price, items} = req.body;
    const orderSql = `INSERT INTO takeaway_orders (name, email, phone_number, pickup_time, total_price) VALUES (?, ?, ?, ?, ?)`;

    db.query(
        orderSql, [name, email, phone_number, pickup_time, total_price], (err, result) => {
            if(err) {
                return res.status(500).json(err);
            }

            const orderId = result.insertId;
            const itemSql = `INSERT INTO takeaway_order_items (order_id, item_id, quantity) VALUES ?`;

            const values = items.map(item => [
                orderId,
                item.item_id,
                item.quantity
            ]);

            db.query(
                itemSql, [values], (err) => {
                    if(err) {
                        return res.status(500).json(err);
                    }

                    res.json({
                        message: "Order skapad"
                    });
                }
            );
        }
    );
});


// Route för att markera order som färdig
router.put("/complete/:id", auth,(req, res) => {
    const orderId = req.params.id;
    const sql = `UPDATE takeaway_orders SET is_completed = TRUE WHERE order_id = ?`;

    db.query(
        sql, [orderId], (err) => {
            if(err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Beställning markerad som färdig"
            });
        }
    );
});

module.exports = router;