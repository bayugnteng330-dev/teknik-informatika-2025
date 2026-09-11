"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Informasi = {
    id: number;
    judul: string;
    isi: string;
    created_at?: string;
};

// =================================
// API RAILWAY
// =================================

const API =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://trustworthy-strength-production-497e.up.railway.app/api";


export default function InformasiPage() {

    const [informasi, setInformasi] =
        useState<Informasi[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // =================================
    // AMBIL DATA INFORMASI
    // =================================

    const getInformasi = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await fetch(
                    `${API}/informasi`,
                    {
                        cache: "no-store",
                    }
                );


            const result =
                await response.json();


            console.log(
                "INFORMASI API:",
                result
            );


            if (
                !response.ok ||
                result.status === false
            ) {

                throw new Error(
                    result.message ||
                    result.error ||
                    "Gagal mengambil informasi"
                );

            }


            setInformasi(
                result.data || []
            );


        } catch (err) {

            console.error(
                "GET INFORMASI ERROR:",
                err
            );


            setError(
                err instanceof Error
                    ? err.message
                    : "Gagal mengambil informasi"
            );


        } finally {

            setLoading(false);

        }

    };


    // =================================
    // LOAD DATA
    // =================================

    useEffect(() => {

        getInformasi();

    }, []);


    return (

        <main className="min-h-screen bg-slate-950 text-white">


            {/* ================================= */}
            {/* NAVBAR */}
            {/* ================================= */}

            <nav
                className="
                    sticky
                    top-0
                    z-50
                    border-b
                    border-white/10
                    bg-slate-950/90
                    backdrop-blur
                "
            >

                <div
                    className="
                        mx-auto
                        flex
                        max-w-7xl
                        items-center
                        justify-between
                        px-6
                        py-4
                    "
                >

                    {/* LOGO */}

                    <Link
                        href="/"
                        className="
                            text-xl
                            font-black
                        "
                    >

                        INFORMATIKA

                        <span className="text-blue-500">
                            25
                        </span>

                    </Link>


                    {/* MENU */}

                    <div
                        className="
                            hidden
                            items-center
                            gap-6
                            md:flex
                        "
                    >

                        <Link
                            href="/"
                            className="
                                text-sm
                                text-slate-400
                                transition
                                hover:text-white
                            "
                        >
                            Home
                        </Link>


                        <Link
                            href="/mahasiswa"
                            className="
                                text-sm
                                text-slate-400
                                transition
                                hover:text-white
                            "
                        >
                            Mahasiswa
                        </Link>


                        <Link
                            href="/galeri"
                            className="
                                text-sm
                                text-slate-400
                                transition
                                hover:text-white
                            "
                        >
                            Galeri
                        </Link>


                        <Link
                            href="/informasi"
                            className="
                                text-sm
                                font-semibold
                                text-blue-400
                            "
                        >
                            Informasi
                        </Link>


                        <Link
                            href="/contact"
                            className="
                                text-sm
                                text-slate-400
                                transition
                                hover:text-white
                            "
                        >
                            Contact
                        </Link>

                    </div>


                    {/* LOGIN */}

                    <Link
                        href="/login"
                        className="
                            rounded-xl
                            bg-blue-600
                            px-4
                            py-2
                            text-sm
                            font-semibold
                            transition
                            hover:bg-blue-500
                        "
                    >
                        Login
                    </Link>

                </div>

            </nav>


            {/* ================================= */}
            {/* HERO */}
            {/* ================================= */}

            <section
                className="
                    relative
                    overflow-hidden
                "
            >

                {/* GLOW */}

                <div
                    className="
                        absolute
                        left-1/2
                        top-0
                        h-80
                        w-80
                        -translate-x-1/2
                        rounded-full
                        bg-blue-600/10
                        blur-3xl
                    "
                />


                <div
                    className="
                        relative
                        mx-auto
                        max-w-5xl
                        px-6
                        py-24
                        text-center
                    "
                >

                    {/* ICON */}

                    <div className="mb-5 text-6xl">
                        📢
                    </div>


                    {/* LABEL */}

                    <p
                        className="
                            mb-3
                            text-sm
                            font-semibold
                            uppercase
                            tracking-[0.3em]
                            text-blue-400
                        "
                    >
                        Angkatan 2025
                    </p>


                    {/* TITLE */}

                    <h1
                        className="
                            text-4xl
                            font-black
                            md:text-6xl
                        "
                    >
                        Informasi
                    </h1>


                    {/* DESCRIPTION */}

                    <p
                        className="
                            mx-auto
                            mt-5
                            max-w-2xl
                            text-slate-400
                        "
                    >
                        Informasi dan pengumuman terbaru
                        Teknik Informatika Angkatan 2025.
                    </p>

                </div>

            </section>


            {/* ================================= */}
            {/* CONTENT */}
            {/* ================================= */}

            <section
                className="
                    mx-auto
                    max-w-5xl
                    px-6
                    pb-24
                "
            >


                {/* ================================= */}
                {/* LOADING */}
                {/* ================================= */}

                {loading && (

                    <div
                        className="
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/5
                            p-12
                            text-center
                        "
                    >

                        <div className="text-5xl">
                            ⏳
                        </div>


                        <p
                            className="
                                mt-4
                                text-slate-400
                            "
                        >
                            Memuat informasi...
                        </p>

                    </div>

                )}


                {/* ================================= */}
                {/* ERROR */}
                {/* ================================= */}

                {!loading && error && (

                    <div
                        className="
                            rounded-2xl
                            border
                            border-red-500/20
                            bg-red-500/10
                            p-8
                            text-center
                        "
                    >

                        <div className="text-5xl">
                            ⚠️
                        </div>


                        <h2
                            className="
                                mt-4
                                text-xl
                                font-bold
                            "
                        >
                            Gagal Memuat Informasi
                        </h2>


                        <p
                            className="
                                mt-2
                                text-sm
                                text-red-400
                            "
                        >
                            {error}
                        </p>


                        <button
                            onClick={
                                getInformasi
                            }
                            className="
                                mt-6
                                rounded-xl
                                bg-red-500/20
                                px-5
                                py-3
                                text-sm
                                font-semibold
                                text-red-300
                                transition
                                hover:bg-red-500/30
                            "
                        >
                            🔄 Coba Lagi
                        </button>

                    </div>

                )}


                {/* ================================= */}
                {/* DATA KOSONG */}
                {/* ================================= */}

                {!loading &&
                    !error &&
                    informasi.length === 0 && (

                        <div
                            className="
                                rounded-2xl
                                border
                                border-dashed
                                border-white/10
                                bg-white/5
                                p-12
                                text-center
                            "
                        >

                            <div className="text-6xl">
                                📭
                            </div>


                            <h2
                                className="
                                    mt-5
                                    text-xl
                                    font-bold
                                "
                            >
                                Belum Ada Informasi
                            </h2>


                            <p
                                className="
                                    mt-2
                                    text-sm
                                    text-slate-500
                                "
                            >
                                Belum ada informasi yang
                                dipublikasikan oleh admin.
                            </p>

                        </div>

                    )}


                {/* ================================= */}
                {/* LIST INFORMASI */}
                {/* ================================= */}

                {!loading &&
                    !error &&
                    informasi.length > 0 && (

                        <div
                            className="
                                space-y-6
                            "
                        >

                            {informasi.map(
                                (item) => (

                                    <article
                                        key={item.id}
                                        className="
                                            group
                                            rounded-2xl
                                            border
                                            border-white/10
                                            bg-white/5
                                            p-6
                                            transition
                                            duration-300
                                            hover:-translate-y-1
                                            hover:border-blue-500/30
                                            hover:bg-white/[0.07]
                                            md:p-8
                                        "
                                    >

                                        <div
                                            className="
                                                flex
                                                flex-col
                                                gap-5
                                                md:flex-row
                                            "
                                        >


                                            {/* ================================= */}
                                            {/* ICON */}
                                            {/* ================================= */}

                                            <div
                                                className="
                                                    flex
                                                    h-14
                                                    w-14
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-2xl
                                                    bg-blue-500/10
                                                    text-2xl
                                                "
                                            >
                                                📢
                                            </div>


                                            {/* ================================= */}
                                            {/* INFORMASI */}
                                            {/* ================================= */}

                                            <div
                                                className="
                                                    flex-1
                                                "
                                            >


                                                <div
                                                    className="
                                                        flex
                                                        flex-col
                                                        justify-between
                                                        gap-2
                                                        md:flex-row
                                                    "
                                                >

                                                    {/* JUDUL */}

                                                    <h2
                                                        className="
                                                            text-xl
                                                            font-bold
                                                            md:text-2xl
                                                        "
                                                    >
                                                        {
                                                            item.judul
                                                        }
                                                    </h2>


                                                    {/* TANGGAL */}

                                                    {item.created_at && (

                                                        <span
                                                            className="
                                                                text-xs
                                                                text-slate-600
                                                            "
                                                        >

                                                            {new Date(
                                                                item.created_at
                                                            ).toLocaleDateString(
                                                                "id-ID",
                                                                {
                                                                    day: "numeric",
                                                                    month: "long",
                                                                    year: "numeric",
                                                                }
                                                            )}

                                                        </span>

                                                    )}

                                                </div>


                                                {/* ================================= */}
                                                {/* ISI */}
                                                {/* ================================= */}

                                                <div
                                                    className="
                                                        mt-5
                                                        border-t
                                                        border-white/10
                                                        pt-5
                                                    "
                                                >

                                                    <p
                                                        className="
                                                            whitespace-pre-line
                                                            text-sm
                                                            leading-7
                                                            text-slate-400
                                                            md:text-base
                                                        "
                                                    >
                                                        {
                                                            item.isi
                                                        }
                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    </article>

                                )
                            )}

                        </div>

                    )}

            </section>


            {/* ================================= */}
            {/* FOOTER */}
            {/* ================================= */}

            <footer
                className="
                    border-t
                    border-white/10
                "
            >

                <div
                    className="
                        mx-auto
                        max-w-7xl
                        px-6
                        py-8
                        text-center
                    "
                >

                    <p
                        className="
                            text-sm
                            text-slate-500
                        "
                    >
                        © 2025 Teknik Informatika
                        Angkatan 2025
                    </p>


                    <p
                        className="
                            mt-1
                            text-xs
                            text-slate-600
                        "
                    >
                        Universitas Khairun
                    </p>

                </div>

            </footer>

        </main>

    );
}