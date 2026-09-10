const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const db = require("../db");
const auth = require("../middleware/auth");


// =====================================================
// FOLDER UPLOAD
// =====================================================

const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, {
        recursive: true
    });
}


// =====================================================
// MULTER STORAGE
// =====================================================

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {

        const ext = path
            .extname(file.originalname)
            .toLowerCase();

        const namaFile =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1E9) +
            ext;

        cb(null, namaFile);
    }

});


// =====================================================
// MULTER
// =====================================================

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

        const ext = path
            .extname(file.originalname)
            .toLowerCase();

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


// =====================================================
// GET SEMUA MAHASISWA
// PUBLIC
// GET /api/mahasiswa
// =====================================================

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
                error: err.message || "Database query gagal"
            });
        }

        return res.json({
            status: true,
            data: results
        });

    });

});


// =====================================================
// GET MAHASISWA BERDASARKAN ID
// PUBLIC
// GET /api/mahasiswa/:id
// =====================================================

router.get("/:id", (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT *
        FROM mahasiswa
        WHERE id = ?
        LIMIT 1
    `;

    db.query(
        sql,
        [id],
        (err, results) => {

            if (err) {

                console.error(
                    "GET MAHASISWA ID ERROR:",
                    err
                );

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

            return res.json({
                status: true,
                data: results[0]
            });

        }
    );

});


// =====================================================
// TAMBAH MAHASISWA
// PRIVATE
// POST /api/mahasiswa
// =====================================================

router.post(
    "/",
    auth,
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


        // ---------------------------------------------
        // VALIDASI
        // ---------------------------------------------

        if (!nama || !nim) {

            // Hapus foto jika sudah ter-upload
            if (req.file) {
                fs.unlink(
                    req.file.path,
                    () => {}
                );
            }

            return res.status(400).json({
                status: false,
                message: "Nama dan NIM wajib diisi"
            });
        }


        // ---------------------------------------------
        // FOTO
        // ---------------------------------------------

        const foto = req.file
            ? req.file.filename
            : null;


        // ---------------------------------------------
        // INSERT DATABASE
        // ---------------------------------------------

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
                nama.trim(),
                nim.trim(),
                prodi?.trim() || "Teknik Informatika",
                kelas?.trim() || "",
                angkatan?.trim() || "2025",
                whatsapp?.trim() || null,
                instagram?.trim() || null,
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


                return res.status(201).json({

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


// =====================================================
// UPDATE MAHASISWA
// PRIVATE
// PUT /api/mahasiswa/:id
// =====================================================

router.put(
    "/:id",
    auth,
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


        // ---------------------------------------------
        // AMBIL FOTO LAMA
        // ---------------------------------------------

        db.query(
            "SELECT foto FROM mahasiswa WHERE id = ?",
            [id],
            (err, oldData) => {

                if (err) {

                    if (req.file) {
                        fs.unlink(
                            req.file.path,
                            () => {}
                        );
                    }

                    return res.status(500).json({
                        status: false,
                        message:
                            "Gagal mengambil data mahasiswa",
                        error: err.message
                    });
                }


                if (oldData.length === 0) {

                    if (req.file) {
                        fs.unlink(
                            req.file.path,
                            () => {}
                        );
                    }

                    return res.status(404).json({
                        status: false,
                        message:
                            "Mahasiswa tidak ditemukan"
                    });
                }


                let foto =
                    oldData[0].foto;


                // -----------------------------------------
                // FOTO BARU
                // -----------------------------------------

                if (req.file) {
                    foto = req.file.filename;
                }


                // -----------------------------------------
                // UPDATE
                // -----------------------------------------

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
                        nama?.trim() || "",
                        nim?.trim() || "",
                        prodi?.trim() ||
                            "Teknik Informatika",
                        kelas?.trim() || "",
                        angkatan?.trim() || "2025",
                        whatsapp?.trim() || null,
                        instagram?.trim() || null,
                        foto,
                        id
                    ],
                    (err, result) => {

                        if (err) {

                            if (req.file) {
                                fs.unlink(
                                    req.file.path,
                                    () => {}
                                );
                            }

                            return res.status(500).json({
                                status: false,
                                message:
                                    "Gagal mengupdate mahasiswa",
                                error: err.message
                            });
                        }


                        // ---------------------------------
                        // HAPUS FOTO LAMA
                        // ---------------------------------

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


                        return res.json({

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


// =====================================================
// DELETE MAHASISWA
// PRIVATE
// DELETE /api/mahasiswa/:id
// =====================================================

router.delete(
    "/:id",
    auth,
    (req, res) => {

        const { id } = req.params;


        // ---------------------------------------------
        // CARI FOTO
        // ---------------------------------------------

        db.query(
            "SELECT foto FROM mahasiswa WHERE id = ?",
            [id],
            (err, results) => {

                if (err) {

                    return res.status(500).json({
                        status: false,
                        message:
                            "Gagal mengambil data mahasiswa",
                        error: err.message
                    });
                }


                if (results.length === 0) {

                    return res.status(404).json({
                        status: false,
                        message:
                            "Mahasiswa tidak ditemukan"
                    });
                }


                const foto =
                    results[0].foto;


                // -----------------------------------------
                // DELETE DATABASE
                // -----------------------------------------

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
                                message:
                                    "Gagal menghapus mahasiswa",
                                error: err.message
                            });
                        }


                        // ---------------------------------
                        // DELETE FOTO
                        // ---------------------------------

                        if (foto) {

                            const fotoPath =
                                path.join(
                                    uploadDir,
                                    foto
                                );

                            if (
                                fs.existsSync(
                                    fotoPath
                                )
                            ) {

                                fs.unlink(
                                    fotoPath,
                                    () => {}
                                );

                            }

                        }


                        return res.json({

                            status: true,

                            message:
                                "Mahasiswa berhasil dihapus"

                        });

                    }
                );

            }
        );

    }
);


// =====================================================
// ERROR MULTER
// =====================================================

router.use(
    (err, req, res, next) => {

        console.error(
            "MAHASISWA ROUTE ERROR:",
            err
        );

        if (
            err instanceof multer.MulterError
        ) {

            if (
                err.code === "LIMIT_FILE_SIZE"
            ) {

                return res.status(400).json({
                    status: false,
                    message:
                        "Ukuran foto maksimal 5 MB"
                });

            }

            return res.status(400).json({
                status: false,
                message:
                    "Upload foto gagal: " +
                    err.message
            });
        }


        if (err) {

            return res.status(400).json({
                status: false,
                message:
                    err.message ||
                    "Upload foto gagal"
            });

        }

        next();

    }
);


module.exports = router;