"use strict";

const express = require("express");
const router = express.Router();
const db = require("../models/db");
const auth = require("../middleware/authMiddleware");

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

// Post route för att lägga till pizza i menyn (skyddad)
router.post("/", auth, (req, res) => {
    const { title, description, price, image } = req.body;
    const sql = `INSERT INTO menu_items(title, description, price, image) VALUES (?, ?, ?, ?)`;

    db.query(
        sql, [title, description, price, image], (err, result) => {
            if(err) {
                console.error(err);
                return res.status(500).json({ error: "Fel vid tillägg av pizza" });
            }
            res.json({
                message: "Pizza tillagd"
            });
        }
    );
});

// Update routeför att uppdatera menyn
router.put("/:id", auth, (req, res) => {
    const { title, description, price, image } = req.body;
    const sql = `UPDATE menu_items SET title=?, description=?, price=?, image=? WHERE item_id=?`;

    db.query(
        sql,
        [title, description, price, image, req.params.id],
        (err) => {

            if(err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Pizza uppdaterad"
            });
        }
    );
});

// Delete routeför att ta bort ett item från menyn
router.delete("/:id", auth, (req, res) => {
    const sql = `DELETE FROM menu_items WHERE item_id=?`;

    db.query(sql, [req.params.id], (err) => {
        if(err) {
            return res.status(500).json(err);
        }
        res.json({
            message: "Pizza borttagen"
        });
    });
});

module.exports = router;