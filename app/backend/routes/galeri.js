const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const db = require("../db");


// ========================================
// KONFIGURASI UPLOAD
// ========================================

const uploadDir = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, {
        recursive: true
    });
}


const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },

    filename: function (req, file, cb) {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1E9) +
            path.extname(file.originalname);

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
        cb(new Error("File harus berupa JPG, JPEG, PNG, atau WEBP"));
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
// POST TAMBAH GALERI + UPLOAD FOTO
// ========================================

router.post("/", upload.single("foto"), (req, res) => {

    const {
        judul,
        deskripsi
    } = req.body;


    if (!judul) {

        // Hapus foto jika judul kosong
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }

        return res.status(400).json({
            status: false,
            message: "Judul galeri wajib diisi"
        });

    }


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
            judul,
            deskripsi || null,
            foto
        ],
        (err, result) => {

            if (err) {

                if (req.file) {
                    fs.unlinkSync(req.file.path);
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

});


// ========================================
// DELETE GALERI
// ========================================

router.delete("/:id", (req, res) => {

    const { id } = req.params;


    // Ambil data foto terlebih dahulu
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
                (deleteErr) => {

                    if (deleteErr) {

                        return res.status(500).json({
                            status: false,
                            message: deleteErr.message
                        });

                    }


                    // Hapus file foto
                    if (foto) {

                        const fotoPath =
                            path.join(uploadDir, foto);

                        if (fs.existsSync(fotoPath)) {
                            fs.unlinkSync(fotoPath);
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

});


module.exports = router;