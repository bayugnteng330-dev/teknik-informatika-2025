const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const db = require("../db");
const cloudinary = require("../cloudinary");
const auth = require("../middleware/auth");


// ========================================
// KONFIGURASI CLOUDINARY
// ========================================

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,

    params: {
        folder: "informatika25/galeri",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        transformation: [
            {
                width: 1600,
                height: 1600,
                crop: "limit"
            }
        ]
    }
});


const upload = multer({
    storage: storage,

    limits: {
        fileSize: 5 * 1024 * 1024
    }
});


// ========================================
// GET SEMUA GALERI
// ========================================

router.get("/", (req, res) => {

    const sql = `
        SELECT *
        FROM galeri
        ORDER BY id DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {

            return res.status(500).json({
                status: false,
                message: "Gagal mengambil data galeri",
                error: err.message
            });

        }

        res.json({
            status: true,
            data: results
        });

    });

});


// ========================================
// GET GALERI BERDASARKAN ID
// ========================================

router.get("/:id", (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT *
        FROM galeri
        WHERE id = ?
    `;

    db.query(sql, [id], (err, results) => {

        if (err) {

            return res.status(500).json({
                status: false,
                message: err.message
            });

        }

        if (results.length === 0) {

            return res.status(404).json({
                status: false,
                message: "Galeri tidak ditemukan"
            });

        }

        res.json({
            status: true,
            data: results[0]
        });

    });

});


// ========================================
// POST TAMBAH GALERI + CLOUDINARY
// ========================================

router.post(
    "/",
    auth,
    upload.single("foto"),
    (req, res) => {

        const {
            judul,
            deskripsi
        } = req.body;


        if (!judul) {

            return res.status(400).json({
                status: false,
                message: "Judul galeri wajib diisi"
            });

        }


        const foto = req.file
            ? req.file.path
            : null;


        const sql = `
            INSERT INTO galeri
            (judul, deskripsi, foto)
            VALUES (?, ?, ?)
        `;


        db.query(
            sql,
            [
                judul,
                deskripsi || null,
                foto
            ],
            (err, result) => {

                if (err) {

                    // Jika database gagal,
                    // hapus foto dari Cloudinary
                    if (req.file && req.file.filename) {

                        cloudinary.uploader.destroy(
                            req.file.filename
                        ).catch(() => {});

                    }

                    return res.status(500).json({
                        status: false,
                        message: "Gagal menyimpan galeri",
                        error: err.message
                    });

                }


                res.status(201).json({

                    status: true,

                    message: "Galeri berhasil ditambahkan",

                    data: {
                        id: result.insertId,
                        judul,
                        deskripsi,
                        foto
                    }

                });

            }
        );

    }
);


// ========================================
// DELETE GALERI
// ========================================

router.delete(
    "/:id",
    auth,
    (req, res) => {

        const { id } = req.params;


        // Ambil data foto
        db.query(
            "SELECT foto FROM galeri WHERE id = ?",
            [id],
            (err, results) => {

                if (err) {

                    return res.status(500).json({
                        status: false,
                        message: err.message
                    });

                }


                if (results.length === 0) {

                    return res.status(404).json({
                        status: false,
                        message: "Galeri tidak ditemukan"
                    });

                }


                const foto = results[0].foto;


                // Hapus dari database
                db.query(
                    "DELETE FROM galeri WHERE id = ?",
                    [id],
                    async (deleteErr) => {

                        if (deleteErr) {

                            return res.status(500).json({
                                status: false,
                                message: deleteErr.message
                            });

                        }


                        // ========================================
                        // HAPUS FOTO DARI CLOUDINARY
                        // ========================================

                        if (
                            foto &&
                            foto.includes("cloudinary.com")
                        ) {

                            try {

                                /*
                                Contoh URL:

                                https://res.cloudinary.com/
                                cloud/image/upload/
                                v123456/
                                informatika25/galeri/foto.jpg

                                Kita ambil public_id:
                                informatika25/galeri/foto
                                */

                                const parts =
                                    foto.split("/upload/")[1];

                                if (parts) {

                                    const publicId =
                                        parts
                                            .replace(/^v[0-9]+\//, "")
                                            .replace(/\.[^/.]+$/, "");

                                    await cloudinary.uploader.destroy(
                                        publicId
                                    );

                                }

                            } catch (cloudinaryError) {

                                console.error(
                                    "CLOUDINARY DELETE ERROR:",
                                    cloudinaryError.message
                                );

                            }

                        }


                        res.json({
                            status: true,
                            message: "Galeri berhasil dihapus"
                        });

                    }
                );

            }
        );

    }
);


module.exports = router;