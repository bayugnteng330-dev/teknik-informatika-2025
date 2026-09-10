const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
const db = require("../db");


// ========================================
// LOGIN ADMIN
// PUBLIC - TIDAK MEMBUTUHKAN TOKEN
// ========================================

router.post("/login", async (req, res) => {

    try {

        const { username, password } = req.body;

        // Validasi
        if (!username || !password) {

            return res.status(400).json({
                status: false,
                message: "Username dan password wajib diisi"
            });

        }


        // Cari admin
        const sql = `
            SELECT id, username, password
            FROM admin
            WHERE username = ?
            LIMIT 1
        `;

        db.query(
            sql,
            [username],
            async (err, results) => {

                if (err) {

                    console.error(
                        "LOGIN DATABASE ERROR:",
                        err
                    );

                    return res.status(500).json({
                        status: false,
                        message: "Gagal melakukan login",
                        error: err.message
                    });

                }


                // Username tidak ditemukan
                if (results.length === 0) {

                    return res.status(401).json({
                        status: false,
                        message: "Username atau password salah"
                    });

                }


                const admin = results[0];


                // ========================================
                // CEK PASSWORD
                // ========================================

                let passwordMatch;

                try {

                    passwordMatch =
                        await bcrypt.compare(
                            password,
                            admin.password
                        );

                } catch (error) {

                    console.error(
                        "BCRYPT ERROR:",
                        error
                    );

                    return res.status(500).json({
                        status: false,
                        message:
                            "Gagal memverifikasi password"
                    });

                }


                if (!passwordMatch) {

                    return res.status(401).json({
                        status: false,
                        message: "Username atau password salah"
                    });

                }


                // ========================================
                // CEK JWT SECRET
                // ========================================

                if (!process.env.JWT_SECRET) {

                    console.error(
                        "JWT_SECRET tidak ditemukan"
                    );

                    return res.status(500).json({
                        status: false,
                        message:
                            "JWT_SECRET belum dikonfigurasi di server"
                    });

                }


                // ========================================
                // BUAT TOKEN
                // ========================================

                let token;

                try {

                    token = jwt.sign(
                        {
                            id: admin.id,
                            username: admin.username
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: "1d"
                        }
                    );

                } catch (error) {

                    console.error(
                        "JWT ERROR:",
                        error
                    );

                    return res.status(500).json({
                        status: false,
                        message:
                            "Gagal membuat token login"
                    });

                }


                // ========================================
                // LOGIN BERHASIL
                // ========================================

                return res.json({

                    status: true,

                    message: "Login berhasil",

                    token: token,

                    admin: {
                        id: admin.id,
                        username: admin.username
                    }

                });

            }
        );

    } catch (error) {

        console.error(
            "LOGIN ERROR:",
            error
        );

        return res.status(500).json({
            status: false,
            message: "Terjadi kesalahan pada server"
        });

    }

});


module.exports = router;