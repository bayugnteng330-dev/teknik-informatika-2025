const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// ===============================
// LOAD ENV
// ===============================
dotenv.config();

// ===============================
// DATABASE
// ===============================
const db = require("./db");

// ===============================
// EXPRESS
// ===============================
const app = express();

// ===============================
// MIDDLEWARE
// ===============================
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// UPLOAD FOTO
// ===============================
app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);

// ===============================
// ROUTES
// ===============================

const authRoutes = require("./routes/auth");
const mahasiswaRoutes = require("./routes/mahasiswa");
const galeriRoutes = require("./routes/galeri");
const informasiRoutes = require("./routes/informasi");

// Kontak hanya aktif kalau file tersedia
let kontakRoutes;

try {
    kontakRoutes = require("./routes/kontak");
} catch (error) {
    console.log(
        "⚠️ routes/kontak belum tersedia"
    );
}

// ===============================
// API ROUTES
// ===============================

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/mahasiswa",
    mahasiswaRoutes
);

app.use(
    "/api/galeri",
    galeriRoutes
);

app.use(
    "/api/informasi",
    informasiRoutes
);

if (kontakRoutes) {
    app.use(
        "/api/kontak",
        kontakRoutes
    );
}

// ===============================
// API TEST
// ===============================

app.get("/api", (req, res) => {
    res.json({
        status: true,
        message: "API Angkatan 25 berjalan",
    });
});

// ===============================
// SERVER TEST
// ===============================

app.get("/", (req, res) => {
    res.json({
        status: true,
        message: "🚀 SERVER ANGKATAN 25 AKTIF",
        api: "/api",
    });
});

// ===============================
// ERROR HANDLER
// ===============================

app.use((err, req, res, next) => {
    console.error("SERVER ERROR:", err);

    res.status(500).json({
        status: false,
        message: "Terjadi kesalahan pada server",
        error: err.message,
    });
});

// ===============================
// PORT
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("=================================");
    console.log("🚀 SERVER ANGKATAN 25");
    console.log(
        `🌐 http://localhost:${PORT}`
    );
    console.log(
        `📡 http://localhost:${PORT}/api`
    );
    console.log(
        `🔐 http://localhost:${PORT}/api/auth/login`
    );
    console.log(
        `👨‍🎓 http://localhost:${PORT}/api/mahasiswa`
    );
    console.log(
        `🖼️ http://localhost:${PORT}/api/galeri`
    );
    console.log(
        `📢 http://localhost:${PORT}/api/informasi`
    );
    console.log(
        `📁 http://localhost:${PORT}/uploads`
    );
    console.log("=================================");
});