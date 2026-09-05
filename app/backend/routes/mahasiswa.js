const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const db = require("../db");

// ==========================================
// FOLDER UPLOAD
// ==========================================

const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, {
        recursive: true
    });
}

// ==========================================
// MULTER
// ==========================================

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {

        const ext = path.extname(file.originalname);

        const namaFile =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1E9) +
            ext;

        cb(null, namaFile);
    }

});

const upload = multer({
    storage: storage,

    limits: {
        fileSize: 5 * 1024 * 1024
    },

    fileFilter: (req, file, cb) => {

        const allowed = [
            ".jpg",
            ".jpeg",
            ".png",
            ".webp"
        ];

        const ext =
            path.extname(
                file.originalname
            ).toLowerCase();

        if (!allowed.includes(ext)) {

            return cb(
                new Error(
                    "Format foto harus JPG, JPEG, PNG, atau WEBP"
                )
            );

        }

        cb(null, true);
    }

});

// ==========================================
// GET SEMUA MAHASISWA
// ==========================================

router.get("/", (req, res) => {

    const sql = `
        SELECT *
        FROM mahasiswa
        ORDER BY id DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {

            console.error(
                "GET MAHASISWA ERROR:",
                err
            );

            return res.status(500).json({
                status: false,
                message: "Gagal mengambil data mahasiswa",
                error: err.message || "Database query gagal",
                code: err.code || "UNKNOWN",
                sqlMessage: err.sqlMessage || ""
            });
        }

        res.json({
            status: true,
            data: results
        });

    });

});

// ==========================================
// GET MAHASISWA BERDASARKAN ID
// ==========================================

router.get("/:id", (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT *
        FROM mahasiswa
        WHERE id = ?
    `;

    db.query(sql, [id], (err, results) => {

        if (err) {

            return res.status(500).json({
                status: false,
                message: "Gagal mengambil mahasiswa",
                error: err.message
            });

        }

        if (results.length === 0) {

            return res.status(404).json({
                status: false,
                message: "Mahasiswa tidak ditemukan"
            });

        }

        res.json({
            status: true,
            data: results[0]
        });

    });

});

// ==========================================
// TAMBAH MAHASISWA + FOTO
// POST /api/mahasiswa
// ==========================================

router.post(
    "/",
    upload.single("foto"),
    (req, res) => {

        const {
            nama,
            nim,
            prodi,
            kelas,
            angkatan,
            whatsapp,
            instagram
        } = req.body;

        // Validasi

        if (!nama || !nim) {

            return res.status(400).json({
                status: false,
                message: "Nama dan NIM wajib diisi"
            });

        }

        // Nama file foto

        const foto = req.file
            ? req.file.filename
            : null;

        const sql = `
            INSERT INTO mahasiswa
            (
                nama,
                nim,
                prodi,
                kelas,
                angkatan,
                whatsapp,
                instagram,
                foto
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(
            sql,
            [
                nama,
                nim,
                prodi || "",
                kelas || "",
                angkatan || "2025",
                whatsapp || null,
                instagram || null,
                foto
            ],
            (err, result) => {

                if (err) {

                    console.error(
                        "POST MAHASISWA ERROR:",
                        err
                    );

                    // Hapus file jika database gagal

                    if (req.file) {

                        fs.unlink(
                            req.file.path,
                            () => {}
                        );

                    }

                    return res.status(500).json({
                        status: false,
                        message: "Gagal menambahkan mahasiswa",
                        error: err.message
                    });

                }

                res.status(201).json({

                    status: true,

                    message:
                        "Mahasiswa berhasil ditambahkan",

                    data: {

                        id: result.insertId,

                        nama,

                        nim,

                        prodi,

                        kelas,

                        angkatan,

                        whatsapp,

                        instagram,

                        foto

                    }

                });

            }
        );

    }
);

// ==========================================
// UPDATE MAHASISWA
// ==========================================

router.put(
    "/:id",
    upload.single("foto"),
    (req, res) => {

        const { id } = req.params;

        const {
            nama,
            nim,
            prodi,
            kelas,
            angkatan,
            whatsapp,
            instagram
        } = req.body;

        // Ambil data lama

        db.query(
            "SELECT foto FROM mahasiswa WHERE id = ?",
            [id],
            (err, oldData) => {

                if (err) {

                    return res.status(500).json({
                        status: false,
                        message: "Gagal mengambil data mahasiswa",
                        error: err.message
                    });

                }

                if (oldData.length === 0) {

                    return res.status(404).json({
                        status: false,
                        message: "Mahasiswa tidak ditemukan"
                    });

                }

                let foto =
                    oldData[0].foto;

                // Jika upload foto baru

                if (req.file) {

                    foto =
                        req.file.filename;

                }

                const sql = `
                    UPDATE mahasiswa
                    SET
                        nama = ?,
                        nim = ?,
                        prodi = ?,
                        kelas = ?,
                        angkatan = ?,
                        whatsapp = ?,
                        instagram = ?,
                        foto = ?
                    WHERE id = ?
                `;

                db.query(
                    sql,
                    [
                        nama,
                        nim,
                        prodi || "",
                        kelas || "",
                        angkatan || "2025",
                        whatsapp || null,
                        instagram || null,
                        foto,
                        id
                    ],
                    (err, result) => {

                        if (err) {

                            return res.status(500).json({
                                status: false,
                                message: "Gagal mengupdate mahasiswa",
                                error: err.message
                            });

                        }

                        // Hapus foto lama
                        // jika upload foto baru

                        if (
                            req.file &&
                            oldData[0].foto
                        ) {

                            const oldPath =
                                path.join(
                                    uploadDir,
                                    oldData[0].foto
                                );

                            if (
                                fs.existsSync(oldPath)
                            ) {

                                fs.unlink(
                                    oldPath,
                                    () => {}
                                );

                            }

                        }

                        res.json({

                            status: true,

                            message:
                                "Mahasiswa berhasil diupdate"

                        });

                    }
                );

            }
        );

    }
);

// ==========================================
// DELETE MAHASISWA
// ==========================================

router.delete("/:id", (req, res) => {

    const { id } = req.params;

    // Cari foto terlebih dahulu

    db.query(
        "SELECT foto FROM mahasiswa WHERE id = ?",
        [id],
        (err, results) => {

            if (err) {

                return res.status(500).json({
                    status: false,
                    message: "Gagal mengambil data mahasiswa",
                    error: err.message
                });

            }

            if (results.length === 0) {

                return res.status(404).json({
                    status: false,
                    message: "Mahasiswa tidak ditemukan"
                });

            }

            const foto =
                results[0].foto;

            // Hapus database

            db.query(
                "DELETE FROM mahasiswa WHERE id = ?",
                [id],
                (err, result) => {

                    if (err) {

                        console.error(
                            "DELETE MAHASISWA ERROR:",
                            err
                        );

                        return res.status(500).json({
                            status: false,
                            message: "Gagal menghapus mahasiswa",
                            error: err.message
                        });

                    }

                    // Hapus foto

                    if (foto) {

                        const fotoPath =
                            path.join(
                                uploadDir,
                                foto
                            );

                        if (
                            fs.existsSync(fotoPath)
                        ) {

                            fs.unlink(
                                fotoPath,
                                () => {}
                            );

                        }

                    }

                    res.json({

                        status: true,

                        message:
                            "Mahasiswa berhasil dihapus"

                    });

                }
            );

        }
    );

});

// ==========================================
// EXPORT
// ==========================================

module.exports = router;