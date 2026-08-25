"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
    const texts = ["25 S A V A G E !!!"];

    const [textIndex, setTextIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [deleting, setDeleting] = useState(false);

    /* ==============================
       TYPING ANIMATION
    ============================== */

    useEffect(() => {
        const currentText = texts[textIndex];
        const speed = deleting ? 50 : 100;

        const timer = setTimeout(() => {
            if (!deleting) {
                setDisplayText(
                    currentText.substring(
                        0,
                        displayText.length + 1
                    )
                );

                if (
                    displayText.length + 1 ===
                    currentText.length
                ) {
                    setTimeout(() => {
                        setDeleting(true);
                    }, 1500);
                }
            } else {
                setDisplayText(
                    currentText.substring(
                        0,
                        displayText.length - 1
                    )
                );

                if (displayText.length === 0) {
                    setDeleting(false);

                    setTextIndex(
                        (textIndex + 1) % texts.length
                    );
                }
            }
        }, speed);

        return () => clearTimeout(timer);
    }, [displayText, deleting, textIndex]);

    /* ==============================
       SCROLL REVEAL
    ============================== */

    useEffect(() => {
        const elements =
            document.querySelectorAll(".scroll-reveal");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(
                            "scroll-show"
                        );
                    }
                });
            },
            {
                threshold: 0.15,
            }
        );

        elements.forEach((element) => {
            observer.observe(element);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <main className="home-page">

            {/* =========================
                BACKGROUND
            ========================= */}

            <div className="hex-background"></div>

            <div className="home-glow home-glow-1"></div>

            <div className="home-glow home-glow-2"></div>


            {/* =========================
                HERO
            ========================= */}

            <section className="home-hero">

                <div className="home-container">

                    {/* =========================
                        LEFT CONTENT
                    ========================= */}

                    <div className="home-content">

                        <p className="home-small-title">
                            UNIVERSITAS KHAIRUN
                        </p>


                        <h1 className="home-title">
                            Mahasiswa
                            <br />

                            Teknik{" "}

                            <span className="informatika">
                                Informatika
                            </span>
                        </h1>


                        {/* TYPING */}

                        <div className="typing-wrapper">

                            <span className="typing-text">
                                {displayText}
                            </span>

                            <span className="typing-cursor">
                                |
                            </span>

                        </div>


                        <p className="home-description">
                            Keluarga besar mahasiswa
                            Teknik Informatika
                            Angkatan 2025.
                        </p>


                        {/* BUTTON */}

                        <div className="home-buttons">

                            <Link
                                href="/mahasiswa"
                                className="home-button primary"
                            >
                                Mahasiswa
                            </Link>


                            <Link
                                href="/galeri"
                                className="home-button secondary"
                            >
                                Galeri
                            </Link>

                        </div>

                    </div>


                   
{/* =====================================================
    RIGHT - LOGO FUTURISTIK
===================================================== */}

<div className="home-logo-area flex w-full items-center justify-center">

    {/* CONTAINER UTAMA — JANGAN DIKECILKAN */}
    <div
        className="
            relative
            flex
            h-[360px]
            w-[360px]
            items-center
            justify-center
            sm:h-[430px]
            sm:w-[430px]
            md:h-[500px]
            md:w-[500px]
        "
    >

        {/* GLOW */}
        <div
            className="
                absolute
                left-1/2
                top-1/2
                h-[220px]
                w-[220px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-blue-600/20
                blur-[80px]
                sm:h-[280px]
                sm:w-[280px]
                md:h-[320px]
                md:w-[320px]
            "
        />

        {/* =================================================
            SEGITIGA LUAR — SUDAH DIPERKECIL
        ================================================= */}

        <div
            className="
                absolute
                left-[10%]
                right-[10%]
                top-[7%]
                bottom-[7%]

                [clip-path:polygon(50%_0%,100%_100%,0%_100%)]

                bg-gradient-to-b
                from-cyan-300
                via-blue-500
                to-blue-950

                shadow-[0_0_45px_rgba(14,165,233,0.55)]

                sm:left-[12%]
                sm:right-[12%]
                sm:top-[8%]
                sm:bottom-[8%]

                md:left-[14%]
                md:right-[14%]
                md:top-[9%]
                md:bottom-[9%]
            "
        >

            {/* INNER SEGITIGA */}
            <div
                className="
                    absolute
                    inset-[4px]

                    [clip-path:polygon(50%_1%,99%_99%,1%_99%)]

                    bg-[#020817]
                "
            />

        </div>


        {/* =================================================
            SEGITIGA NEON KEDUA — LEBIH KECIL
        ================================================= */}

        <div
            className="
                absolute

                left-[17%]
                right-[17%]
                top-[14%]
                bottom-[14%]

                [clip-path:polygon(50%_0%,100%_100%,0%_100%)]

                bg-gradient-to-b
                from-blue-400
                via-blue-500
                to-cyan-500

                shadow-[0_0_30px_rgba(14,165,233,0.4)]

                sm:left-[19%]
                sm:right-[19%]
                sm:top-[15%]
                sm:bottom-[15%]

                md:left-[21%]
                md:right-[21%]
                md:top-[16%]
                md:bottom-[16%]
            "
        >

            <div
                className="
                    absolute
                    inset-[3px]

                    [clip-path:polygon(50%_1%,99%_99%,1%_99%)]

                    bg-[#06142b]
                "
            />

        </div>


        {/* =================================================
            FOTO HMTI
            UKURAN LOGO TETAP
        ================================================= */}

        <div
            className="
                absolute
                z-20

                top-[23%]
                left-1/2

                w-[62%]

                -translate-x-1/2

                overflow-hidden

                bg-[#020817]

                drop-shadow-[0_0_35px_rgba(14,165,233,0.55)]

                transition
                duration-500

                hover:scale-[1.03]
            "
            style={{
                clipPath:
                    "polygon(50% 0%, 100% 100%, 0% 100%)",
            }}
        >

            <Image
                src="/hmti.jpg"
                alt="Logo HMTI Informatika 2025"
                width={800}
                height={800}
                priority
                sizes="
                    (max-width: 640px) 42vw,
                    (max-width: 768px) 220px,
                    280px
                "
                className="
                    block
                    h-auto
                    w-full
                    object-contain
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-br
                    from-white/10
                    via-transparent
                    to-blue-500/20
                "
            />

        </div>


        {/* =================================================
            PLATFORM
        ================================================= */}

        <div
            className="
                absolute
                bottom-[5%]
                left-1/2
                h-5
                w-[150px]
                -translate-x-1/2
                rounded-[50%]
                border
                border-cyan-400/80
                bg-blue-500/10
                shadow-[0_0_30px_rgba(14,165,233,0.8)]
                sm:w-[200px]
                md:w-[240px]
            "
        />

        <div
            className="
                absolute
                bottom-[6%]
                left-1/2
                h-2
                w-[100px]
                -translate-x-1/2
                rounded-full
                bg-cyan-400
                blur-md
                sm:w-[140px]
                md:w-[170px]
            "
        />


        {/* PARTICLES */}

        <span
            className="
                absolute
                left-[14%]
                top-[38%]
                h-2
                w-2
                animate-pulse
                rounded-full
                bg-cyan-400
                shadow-[0_0_15px_#22d3ee]
            "
        />

        <span
            className="
                absolute
                right-[13%]
                top-[30%]
                h-1.5
                w-1.5
                animate-pulse
                rounded-full
                bg-blue-400
                shadow-[0_0_15px_#3b82f6]
            "
        />

        <span
            className="
                absolute
                left-[20%]
                bottom-[30%]
                h-1.5
                w-1.5
                animate-pulse
                rounded-full
                bg-blue-500
                shadow-[0_0_15px_#3b82f6]
            "
        />

        <span
            className="
                absolute
                right-[20%]
                bottom-[35%]
                h-2
                w-2
                animate-pulse
                rounded-full
                bg-cyan-400
                shadow-[0_0_15px_#22d3ee]
            "
        />

    </div>

</div>



                </div>

            </section>


            {/* =========================
                SCROLL INDICATOR
            ========================= */}

            <div className="home-bottom">

                <span>
                    SCROLL UNTUK MENJELAJAH
                </span>

                <div className="scroll-line"></div>

            </div>


            {/* =================================================
                TENTANG ANGKATAN
            ================================================= */}

            <section
                className="about-angkatan scroll-reveal"
                id="tentang"
            >

                <div className="about-container">

                    <div className="about-heading">

                        <span className="about-label">
                            TENTANG ANGKATAN
                        </span>

                        <h2>
                            Satu Angkatan.
                            <br />

                            <span>
                                Satu Keluarga.
                            </span>
                        </h2>

                    </div>


                    <div className="about-content">

                        <div className="about-text">

                            <p>
                                Teknik Informatika Angkatan
                                2025 Universitas Khairun
                                merupakan keluarga besar
                                mahasiswa yang tumbuh dan
                                berkembang bersama.
                            </p>

                            <p>
                                Kami bukan hanya teman satu
                                kelas, tetapi sebuah keluarga
                                yang saling mendukung dalam
                                perjalanan akademik maupun
                                kehidupan kampus.
                            </p>

                            <p>
                                Website ini dibuat sebagai
                                media untuk memperkenalkan
                                mahasiswa, menyimpan dokumentasi
                                kegiatan, serta membagikan
                                informasi kepada seluruh
                                keluarga Informatika 2025.
                            </p>

                        </div>


                        {/* INFO CARD */}

                        <div className="about-card">

                            <div className="about-card-item">

                                <span>
                                    ANGKATAN
                                </span>

                                <strong>
                                    2025
                                </strong>

                            </div>


                            <div className="about-card-item">

                                <span>
                                    PROGRAM STUDI
                                </span>

                                <strong>
                                    TEKNIK
                                    INFORMATIKA
                                </strong>

                            </div>


                            <div className="about-card-item">

                                <span>
                                    UNIVERSITAS
                                </span>

                                <strong>
                                    KHAIRUN
                                </strong>

                            </div>


                            <div className="about-card-item">

                                <span>
                                    SEMANGAT
                                </span>

                                <strong>
                                    TETAP SATU
                                </strong>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =================================================
                NILAI ANGKATAN
            ================================================= */}

            <section className="values-section scroll-reveal">

                <div className="values-container">

                    <div className="value-card">

                        <div className="value-icon"></div>

                        <h3>
                            Solidaritas
                        </h3>

                        <p>
                            Saling membantu dan mendukung
                            satu sama lain.
                        </p>

                    </div>


                    <div className="value-card">

                        <div className="value-icon"></div>

                        <h3>
                            Kreativitas
                        </h3>

                        <p>
                            Menciptakan ide dan karya
                            baru bersama.
                        </p>

                    </div>


                    <div className="value-card">

                        <div className="value-icon"></div>

                        <h3>
                            Berkembang
                        </h3>

                        <p>
                            Terus belajar dan berkembang
                            menjadi lebih baik.
                        </p>

                    </div>


                    <div className="value-card">

                        <div className="value-icon"></div>

                        <h3>
                            Kekeluargaan
                        </h3>

                        <p>
                            Menjaga hubungan dan kebersamaan
                            antar mahasiswa.
                        </p>

                    </div>

                </div>

            </section>


            {/* =================================================
                MOTTO
            ================================================= */}

            <section className="motto-section scroll-reveal">

                <div className="motto-content">

                    <span>
                        SEMANGAT ANGKATAN 2025
                    </span>

                    <h2>
                        INFORMATIKA
                        <br />

                        <strong>
                            TETAP SATU.
                        </strong>
                    </h2>

                    <p>
                        Berbeda karakter,
                        berbeda pemikiran,
                        tetapi tetap satu keluarga.
                    </p>

                </div>

            </section>


            {/* =================================================
                FOOTER
            ================================================= */}

            <footer className="home-footer">

                <div className="footer-container">

                    {/* BRAND */}

                    <div className="footer-brand">

                        <h3>
                            INFORMATIKA
                            <span>
                                25
                            </span>
                        </h3>

                        <p>
                            Keluarga besar mahasiswa
                            Teknik Informatika
                            Universitas Khairun
                            Angkatan 2025.
                        </p>

                    </div>


                    {/* MENU */}

                    <div className="footer-menu">

                        <h4>
                            MENU
                        </h4>

                        <Link href="/">
                            Home
                        </Link>

                        <Link href="/mahasiswa">
                            Mahasiswa
                        </Link>

                        <Link href="/galeri">
                            Galeri
                        </Link>

                        <Link href="/informasi">
                            Informasi
                        </Link>

                        <Link href="/kontak">
                            Kontak
                        </Link>

                    </div>


                    {/* CONTACT */}

                    <div className="footer-contact">

                        <h4>
                            KONTAK
                        </h4>

                        <p>
                            Universitas Khairun
                        </p>

                        <p>
                            Teknik Informatika
                        </p>

                        <p>
                            Angkatan 2025
                        </p>

                    </div>

                </div>


                {/* COPYRIGHT */}

                <div className="footer-bottom">

                    <p>
                        © 2025 Informatika25.
                        All Rights Reserved.
                    </p>

                    <p>
                        Teknik Informatika
                        Universitas Khairun
                    </p>

                </div>

            </footer>

        </main>
    );
}