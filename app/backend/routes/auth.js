const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
    try {
        // Ambil Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                status: false,
                message: "Token tidak ditemukan. Silakan login terlebih dahulu."
            });
        }

        // Format:
        // Authorization: Bearer TOKEN
        const parts = authHeader.split(" ");

        if (parts.length !== 2 || parts[0] !== "Bearer") {
            return res.status(401).json({
                status: false,
                message: "Format token tidak valid."
            });
        }

        const token = parts[1];

        if (!token) {
            return res.status(401).json({
                status: false,
                message: "Token kosong."
            });
        }

        // Cek JWT_SECRET
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET tidak ditemukan.");

            return res.status(500).json({
                status: false,
                message: "JWT_SECRET belum dikonfigurasi di server."
            });
        }

        // Verifikasi token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Simpan data admin ke request
        req.user = decoded;

        next();

    } catch (error) {
        console.error("AUTH ERROR:", error);

        return res.status(401).json({
            status: false,
            message: "Token tidak valid atau sudah expired."
        });
    }
};