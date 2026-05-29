"use strict";

const express = require("express");
const router = express.Router();
const db = require("../models/db");
const auth = require("../middleware/authMiddleware");

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

router.put("/:id", auth, (req, res) => {
    const { content } = req.body;
    const sql = `UPDATE pages SET content=? WHERE page_id=?`;

    db.query(
        sql, [content, req.params.id],
        (err) => {
            if(err) {
                return res.status(500).json(err);
            }
            res.json({
                message: "Sida uppdaterad"
            });
        }
    );
});

router.get("/about", (req, res) => {

    const sql = `
        SELECT content
        FROM pages
        WHERE slug = 'about'
    `;

    db.query(sql, (err, result) => {

        if(err) {
            return res.status(500).json(err);
        }

        res.json(result[0]);

    });

});

router.get("/homepage", (req, res) => {

    const sql = `
        SELECT *
        FROM pages
        WHERE slug = 'homepage'
    `;

    db.query(sql, (err, result) => {

        if(err) {
            return res.status(500).json(err);
        }

        res.json(result[0]);

    });

});

module.exports = router;