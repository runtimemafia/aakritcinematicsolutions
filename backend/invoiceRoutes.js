const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/:id", (req, res) => {
    const sql = `
    SELECT c.name, c.email, c.address,
           i.id AS invoice_id, i.invoice_date, i.total
    FROM clients c
    JOIN invoices i ON c.id = i.client_id
    WHERE i.id = ?
  `;

    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result[0]);
    });
});

module.exports = router;