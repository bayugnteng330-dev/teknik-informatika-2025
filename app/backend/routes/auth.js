const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
const db = require("../db");

// ==========================================
// LOGIN ADMIN
// POST /api/auth/login
// ==========================================

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Cek input
    if (!username || !password) {
        return res.status(400).json({
            status: false,
            message: "Username dan password wajib diisi",
        });
    }

    // Cari admin berdasarkan username
    const sql = `
        SELECT id, username, password
        FROM admin
        WHERE username = ?
        LIMIT 1
    `;

    db.query(sql, [username], async (err, results) => {
        if (err) {
            console.error("LOGIN ERROR:", err);

            return res.status(500).json({
                status: false,
                message: "Gagal melakukan login",
                error: err.message,
            });
        }

        // Username tidak ditemukan
        if (results.length === 0) {
            return res.status(401).json({
                status: false,
                message: "Username atau password salah",
            });
        }

        const admin = results[0];

        try {
            // Cek password
            const passwordMatch = await bcrypt.compare(
                password,
                admin.password
            );

            if (!passwordMatch) {
                return res.status(401).json({
                    status: false,
                    message: "Username atau password salah",
                });
            }

            // Buat JWT
            const token = jwt.sign(
                {
                    id: admin.id,
                    username: admin.username,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d",
                }
            );

            return res.json({
                status: true,
                message: "Login berhasil",
                token,
                admin: {
                    id: admin.id,
                    username: admin.username,
                },
            });
        } catch (error) {
            console.error("PASSWORD ERROR:", error);

            return res.status(500).json({
                status: false,
                message: "Gagal memverifikasi password",
            });
        }
    });
});

module.exports = router;