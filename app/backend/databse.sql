-- ============================================
-- DATABASE WEBSITE ANGKATAN 25
-- ============================================

CREATE DATABASE IF NOT EXISTS angkatan25
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE angkatan25;


-- ============================================
-- TABEL MAHASISWA
-- ============================================

CREATE TABLE IF NOT EXISTS mahasiswa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(150) NOT NULL,
    nim VARCHAR(30) NOT NULL UNIQUE,
    prodi VARCHAR(100) DEFAULT 'Teknik Informatika',
    kelas VARCHAR(20),
    angkatan VARCHAR(10) DEFAULT '2025',
    whatsapp VARCHAR(30),
    instagram VARCHAR(100),
    foto VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


-- ============================================
-- TABEL GALERI
-- ============================================

CREATE TABLE IF NOT EXISTS galeri (
    id INT AUTO_INCREMENT PRIMARY KEY,
    judul VARCHAR(200) NOT NULL,
    deskripsi TEXT,
    foto VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


-- ============================================
-- TABEL INFORMASI
-- ============================================

CREATE TABLE IF NOT EXISTS informasi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    judul VARCHAR(200) NOT NULL,
    isi TEXT NOT NULL,
    tanggal DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


-- ============================================
-- TABEL KONTAK
-- ============================================

CREATE TABLE IF NOT EXISTS kontak (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    subjek VARCHAR(200),
    pesan TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ============================================
-- DATA CONTOH MAHASISWA
-- ============================================

INSERT INTO mahasiswa
(nama, nim, prodi, kelas, angkatan, whatsapp, instagram, foto)
VALUES
(
    'Muhammad Juhri Ikram',
    '2025004',
    'Teknik Informatika',
    'B',
    '2025',
    '081234567899',
    '@juhri',
    'juhrii.jpg'
);


-- ============================================
-- DATA CONTOH GALERI
-- ============================================

INSERT INTO galeri
(judul, deskripsi, foto)
VALUES
(
    'Foto Angkatan 2025',
    'Dokumentasi mahasiswa Teknik Informatika Angkatan 2025.',
    'angkatan25.jpg'
);


-- ============================================
-- DATA CONTOH INFORMASI
-- ============================================

INSERT INTO informasi
(judul, isi, tanggal)
VALUES
(
    'Selamat Datang di Website Angkatan 25',
    'Website resmi mahasiswa Teknik Informatika Angkatan 2025.',
    CURDATE()
);


-- ============================================
-- CEK TABEL
-- ============================================
