const express = require("express");
const router = express.Router();

const db = require("../db");

// ==========================================
// GET SEMUA INFORMASI
// GET /api/informasi
// ==========================================

router.get("/", (req, res) => {
    const sql = `
        SELECT *
        FROM informasi
        ORDER BY id DESC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("GET INFORMASI ERROR:", err);

            return res.status(500).json({
                status: false,
                message: "Gagal mengambil data informasi",
                error: err.message
            });
        }

        res.json({
            status: true,
            data: results
        });
    });
});


// ==========================================
// GET INFORMASI BERDASARKAN ID
// GET /api/informasi/:id
// ==========================================

router.get("/:id", (req, res) => {
    const { id } = req.params;

    const sql = `
        SELECT *
        FROM informasi
        WHERE id = ?
    `;

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("GET INFORMASI ID ERROR:", err);

            return res.status(500).json({
                status: false,
                message: "Gagal mengambil informasi",
                error: err.message
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                status: false,
                message: "Informasi tidak ditemukan"
            });
        }

        res.json({
            status: true,
            data: results[0]
        });
    });
});


// ==========================================
// TAMBAH INFORMASI
// POST /api/informasi
// ==========================================

router.post("/", (req, res) => {
    const { judul, isi } = req.body;

    if (!judul || !isi) {
        return res.status(400).json({
            status: false,
            message: "Judul dan isi wajib diisi"
        });
    }

    const sql = `
        INSERT INTO informasi
        (judul, isi)
        VALUES (?, ?)
    `;

    db.query(
        sql,
        [judul, isi],
        (err, result) => {
            if (err) {
                console.error(
                    "POST INFORMASI ERROR:",
                    err
                );

                return res.status(500).json({
                    status: false,
                    message: "Gagal menambahkan informasi",
                    error: err.message
                });
            }

            res.status(201).json({
                status: true,
                message: "Informasi berhasil ditambahkan",
                data: {
                    id: result.insertId,
                    judul: judul,
                    isi: isi
                }
            });
        }
    );
});


// ==========================================
// HAPUS INFORMASI
// DELETE /api/informasi/:id
// ==========================================

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    const sql = `
        DELETE FROM informasi
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(
                "DELETE INFORMASI ERROR:",
                err
            );

            return res.status(500).json({
                status: false,
                message: "Gagal menghapus informasi",
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: false,
                message: "Informasi tidak ditemukan"
            });
        }

        res.json({
            status: true,
            message: "Informasi berhasil dihapus"
        });
    });
});


module.exports = router;