const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const db = require("../db");
const auth = require("../middleware/auth");


// ========================================
// FOLDER UPLOAD
// ========================================

const uploadDir = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, {
        recursive: true
    });
}


// ========================================
// KONFIGURASI MULTER
// ========================================

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },

    filename: function (req, file, cb) {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1E9) +
            path.extname(file.originalname).toLowerCase();

        cb(null, uniqueName);
    }

});


const fileFilter = (req, file, cb) => {

    const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp"
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new Error(
                "File harus berupa JPG, JPEG, PNG, atau WEBP"
            )
        );
    }

};


const upload = multer({

    storage: storage,

    fileFilter: fileFilter,

    limits: {
        fileSize: 5 * 1024 * 1024
    }

});


// ========================================
// GET SEMUA GALERI
// PUBLIC
// ========================================

router.get("/", (req, res) => {

    const sql = `
        SELECT *
        FROM galeri
        ORDER BY id DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {

            console.error("GET GALERI ERROR:", err);

            return res.status(500).json({
                status: false,
                message: "Gagal mengambil data galeri",
                error: err.message
            });

        }

        return res.json({
            status: true,
            data: results
        });

    });

});


// ========================================
// GET GALERI BERDASARKAN ID
// PUBLIC
// ========================================

router.get("/:id", (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT *
        FROM galeri
        WHERE id = ?
        LIMIT 1
    `;

    db.query(sql, [id], (err, results) => {

        if (err) {

            console.error("GET GALERI ID ERROR:", err);

            return res.status(500).json({
                status: false,
                message: "Gagal mengambil data galeri",
                error: err.message
            });

        }

        if (results.length === 0) {

            return res.status(404).json({
                status: false,
                message: "Galeri tidak ditemukan"
            });

        }

        return res.json({
            status: true,
            data: results[0]
        });

    });

});


// ========================================
// POST TAMBAH GALERI
// ADMIN
// ========================================

router.post(
    "/",
    auth,
    upload.single("foto"),
    (req, res) => {

        try {

            const {
                judul,
                deskripsi
            } = req.body;

            // Validasi judul
            if (!judul || !judul.trim()) {

                if (req.file) {
                    fs.unlink(
                        req.file.path,
                        () => {}
                    );
                }

                return res.status(400).json({
                    status: false,
                    message: "Judul galeri wajib diisi"
                });

            }

            // Nama file
            const foto = req.file
                ? req.file.filename
                : null;

            const sql = `
                INSERT INTO galeri
                (judul, deskripsi, foto)
                VALUES (?, ?, ?)
            `;

            db.query(
                sql,
                [
                    judul.trim(),
                    deskripsi
                        ? deskripsi.trim()
                        : null,
                    foto
                ],
                (err, result) => {

                    if (err) {

                        console.error(
                            "INSERT GALERI ERROR:",
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
                            message: "Gagal menyimpan galeri",
                            error: err.message
                        });

                    }

                    return res.status(201).json({

                        status: true,

                        message:
                            "Galeri berhasil ditambahkan",

                        data: {
                            id: result.insertId,
                            judul: judul.trim(),
                            deskripsi:
                                deskripsi
                                    ? deskripsi.trim()
                                    : null,
                            foto
                        }

                    });

                }
            );

        } catch (error) {

            console.error(
                "POST GALERI ERROR:",
                error
            );

            if (req.file) {
                fs.unlink(
                    req.file.path,
                    () => {}
                );
            }

            return res.status(500).json({
                status: false,
                message: "Terjadi kesalahan pada server",
                error: error.message
            });

        }

    }
);


// ========================================
// DELETE GALERI
// ADMIN
// ========================================

router.delete(
    "/:id",
    auth,
    (req, res) => {

        const { id } = req.params;

        // Ambil foto terlebih dahulu
        db.query(
            "SELECT foto FROM galeri WHERE id = ? LIMIT 1",
            [id],
            (err, results) => {

                if (err) {

                    console.error(
                        "GET FOTO DELETE ERROR:",
                        err
                    );

                    return res.status(500).json({
                        status: false,
                        message: "Gagal mengambil data galeri",
                        error: err.message
                    });

                }

                if (results.length === 0) {

                    return res.status(404).json({
                        status: false,
                        message: "Galeri tidak ditemukan"
                    });

                }

                const foto = results[0].foto;

                // Hapus database
                db.query(
                    "DELETE FROM galeri WHERE id = ?",
                    [id],
                    (deleteErr) => {

                        if (deleteErr) {

                            console.error(
                                "DELETE GALERI ERROR:",
                                deleteErr
                            );

                            return res.status(500).json({
                                status: false,
                                message: "Gagal menghapus galeri",
                                error: deleteErr.message
                            });

                        }

                        // Hapus file
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
                                    (unlinkErr) => {

                                        if (unlinkErr) {
                                            console.error(
                                                "GAGAL HAPUS FOTO:",
                                                unlinkErr
                                            );
                                        }

                                    }
                                );

                            }

                        }

                        return res.json({
                            status: true,
                            message:
                                "Galeri berhasil dihapus"
                        });

                    }
                );

            }
        );

    }
);


// ========================================
// ERROR MULTER
// ========================================

router.use(
    (err, req, res, next) => {

        if (err instanceof multer.MulterError) {

            if (err.code === "LIMIT_FILE_SIZE") {

                return res.status(400).json({
                    status: false,
                    message:
                        "Ukuran foto maksimal 5 MB"
                });

            }

            return res.status(400).json({
                status: false,
                message: err.message
            });

        }

        if (err) {

            console.error(
                "GALERI UPLOAD ERROR:",
                err
            );

            return res.status(400).json({
                status: false,
                message: err.message ||
                    "Gagal mengupload foto"
            });

        }

        next();

    }
);


module.exports = router;