"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Galeri = {
    id: number;
    judul: string;
    deskripsi: string | null;
    foto: string | null;
    created_at: string;
};

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://trustworthy-strength-production-497e.up.railway.app/api";

const API_SERVER = API_URL.replace(/\/api\/?$/, "");

export default function GaleriPage() {
    const [galeri, setGaleri] = useState<Galeri[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getGaleri = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(`${API_URL}/galeri`, {
                    cache: "no-store",
                });

                if (!response.ok) {
                    throw new Error(
                        `Gagal mengambil data galeri (${response.status})`
                    );
                }

                const result = await response.json();

                if (!result.status) {
                    throw new Error(
                        result.message || "Gagal mengambil data galeri"
                    );
                }

                setGaleri(result.data || []);
            } catch (err) {
                console.error("ERROR GALERI:", err);

                setError(
                    err instanceof Error
                        ? err.message
                        : "Gagal mengambil data galeri"
                );

                setGaleri([]);
            } finally {
                setLoading(false);
            }
        };

        getGaleri();
    }, []);

    return (
        <main className="min-h-screen overflow-hidden bg-[#020617] text-white">

            {/* ================================================= */}
            {/* BACKGROUND */}
            {/* ================================================= */}

            <div className="pointer-events-none fixed inset-0 -z-10">

                <div className="absolute left-[-250px] top-[-200px] h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[140px]" />

                <div className="absolute right-[-250px] top-[20%] h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[140px]" />

                <div className="absolute bottom-[-250px] left-[25%] h-[600px] w-[600px] rounded-full bg-indigo-600/10 blur-[140px]" />

            </div>

            {/* GRID BACKGROUND */}

            <div
                className="pointer-events-none fixed inset-0 -z-10 opacity-[0.025]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* ================================================= */}
            {/* HERO */}
            {/* ================================================= */}

            <section className="relative px-5 pb-20 pt-28 sm:px-8 sm:pt-36">

                <div className="mx-auto max-w-6xl">

                    <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">

                        <div>

                            <div className="mb-6 flex items-center gap-3">

                                <span className="h-px w-10 bg-blue-500" />

                                <span className="text-xs font-bold uppercase tracking-[0.35em] text-blue-400">
                                    Informatika 2025
                                </span>

                            </div>

                            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">

                                Our{" "}

                                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                    Memories
                                </span>

                            </h1>

                            <p className="mt-7 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">

                                Kumpulan momen, kegiatan, dan perjalanan
                                keluarga besar mahasiswa Teknik Informatika
                                Angkatan 2025.

                            </p>

                        </div>

                        {/* COUNTER */}

                        <div className="flex items-center gap-4 lg:pb-2">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-2xl">
                                📸
                            </div>

                            <div>

                                <p className="text-3xl font-black">
                                    {loading ? "..." : galeri.length}
                                </p>

                                <p className="text-xs uppercase tracking-wider text-slate-500">
                                    Memories
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* ================================================= */}
            {/* GALERI */}
            {/* ================================================= */}

            <section className="px-5 pb-28 sm:px-8">

                <div className="mx-auto max-w-6xl">

                    {/* LOADING */}

                    {loading && (

                        <div className="rounded-[30px] border border-white/10 bg-white/[0.03] px-6 py-24 text-center backdrop-blur-xl">

                            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-blue-500" />

                            <p className="mt-6 text-sm text-slate-500">
                                Memuat dokumentasi...
                            </p>

                        </div>

                    )}

                    {/* ERROR */}

                    {!loading && error && (

                        <div className="rounded-[30px] border border-red-500/20 bg-red-500/5 px-6 py-20 text-center backdrop-blur-xl">

                            <div className="text-6xl">
                                ⚠️
                            </div>

                            <h2 className="mt-6 text-2xl font-black">
                                Gagal Memuat Galeri
                            </h2>

                            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">
                                {error}
                            </p>

                            <button
                                onClick={() => window.location.reload()}
                                className="mt-7 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-bold transition hover:bg-blue-500"
                            >
                                Coba Lagi
                            </button>

                        </div>

                    )}

                    {/* DATA KOSONG */}

                    {!loading &&
                        !error &&
                        galeri.length === 0 && (

                            <div className="rounded-[30px] border border-white/10 bg-white/[0.03] px-6 py-24 text-center backdrop-blur-xl">

                                <div className="text-7xl">
                                    📷
                                </div>

                                <h2 className="mt-6 text-2xl font-black">
                                    Belum Ada Dokumentasi
                                </h2>

                                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                                    Foto kegiatan angkatan akan muncul di sini.
                                </p>

                            </div>

                        )}

                    {/* DATA GALERI */}

                    {!loading &&
                        !error &&
                        galeri.length > 0 && (

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

                                {galeri.map((item, index) => {

                                    const featured = index === 0;

                                    /*
                                    Jika foto berupa URL lengkap,
                                    gunakan langsung.

                                    Jika foto hanya berupa nama file,
                                    gunakan URL backend /uploads.
                                    */

                                    const fotoUrl =
                                        item.foto?.startsWith("http")
                                            ? item.foto
                                            : item.foto
                                                ? `${API_SERVER}/uploads/${item.foto}`
                                                : null;

                                    return (

                                        <article
                                            key={item.id}
                                            className={`
                                                group relative overflow-hidden
                                                rounded-[28px]
                                                border border-white/10
                                                bg-slate-900/60
                                                shadow-2xl
                                                backdrop-blur-xl
                                                transition-all
                                                duration-700
                                                hover:-translate-y-2
                                                hover:border-blue-400/40
                                                hover:shadow-[0_30px_100px_rgba(37,99,235,0.18)]
                                                ${featured
                                                    ? "md:col-span-2 lg:col-span-2"
                                                    : ""
                                                }
                                            `}
                                        >

                                            {/* FOTO */}

                                            <div
                                                className={`
                                                    relative overflow-hidden
                                                    ${featured
                                                        ? "h-[380px] sm:h-[480px]"
                                                        : "h-[340px] sm:h-[380px]"
                                                    }
                                                `}
                                            >

                                                {fotoUrl ? (

                                                    <img
                                                        src={fotoUrl}
                                                        alt={item.judul}
                                                        className="
                                                            h-full
                                                            w-full
                                                            object-cover
                                                            transition-transform
                                                            duration-1000
                                                            ease-out
                                                            group-hover:scale-110
                                                        "
                                                        onError={(e) => {
                                                            e.currentTarget.style.display =
                                                                "none";
                                                        }}
                                                    />

                                                ) : (

                                                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950">

                                                        <div className="text-center">

                                                            <div className="text-7xl">
                                                                📷
                                                            </div>

                                                            <p className="mt-4 text-sm text-slate-500">
                                                                Foto belum tersedia
                                                            </p>

                                                        </div>

                                                    </div>

                                                )}

                                                {/* DARK GRADIENT */}

                                                <div
                                                    className="
                                                        absolute inset-0
                                                        bg-gradient-to-t
                                                        from-black
                                                        via-black/20
                                                        to-transparent
                                                        opacity-80
                                                    "
                                                />

                                                {/* BLUE LIGHT */}

                                                <div
                                                    className="
                                                        absolute inset-0
                                                        bg-blue-500/0
                                                        transition
                                                        duration-700
                                                        group-hover:bg-blue-500/10
                                                    "
                                                />

                                                {/* NUMBER */}

                                                <div
                                                    className="
                                                        absolute left-5 top-5
                                                        flex h-10 w-10
                                                        items-center justify-center
                                                        rounded-full
                                                        border border-white/20
                                                        bg-black/40
                                                        text-xs font-black
                                                        backdrop-blur-xl
                                                    "
                                                >
                                                    {String(index + 1).padStart(
                                                        2,
                                                        "0"
                                                    )}
                                                </div>

                                                {/* BADGE */}

                                                <div
                                                    className="
                                                        absolute right-5 top-5
                                                        rounded-full
                                                        border border-blue-400/20
                                                        bg-blue-500/10
                                                        px-3 py-1.5
                                                        text-[10px]
                                                        font-bold
                                                        uppercase
                                                        tracking-wider
                                                        text-blue-300
                                                        backdrop-blur-xl
                                                    "
                                                >
                                                    IF 25
                                                </div>

                                                {/* CONTENT */}

                                                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">

                                                    <div className="mb-3 flex items-center gap-2">

                                                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

                                                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-300">
                                                            Dokumentasi
                                                        </span>

                                                    </div>

                                                    <h2
                                                        className="
                                                            max-w-2xl
                                                            text-2xl
                                                            font-black
                                                            leading-tight
                                                            text-white
                                                            sm:text-3xl
                                                        "
                                                    >
                                                        {item.judul}
                                                    </h2>

                                                    {item.deskripsi && (

                                                        <p
                                                            className="
                                                                mt-3
                                                                max-w-2xl
                                                                line-clamp-2
                                                                text-sm
                                                                leading-6
                                                                text-slate-300
                                                            "
                                                        >
                                                            {item.deskripsi}
                                                        </p>

                                                    )}

                                                </div>

                                                {/* ARROW */}

                                                <div
                                                    className="
                                                        absolute
                                                        bottom-6
                                                        right-6
                                                        flex
                                                        h-11
                                                        w-11
                                                        translate-y-3
                                                        items-center
                                                        justify-center
                                                        rounded-full
                                                        border
                                                        border-white/20
                                                        bg-black/40
                                                        text-lg
                                                        opacity-0
                                                        backdrop-blur-xl
                                                        transition-all
                                                        duration-500
                                                        group-hover:translate-y-0
                                                        group-hover:opacity-100
                                                    "
                                                >
                                                    ↗
                                                </div>

                                            </div>

                                            {/* BOTTOM BAR */}

                                            <div
                                                className="
                                                    flex
                                                    items-center
                                                    justify-between
                                                    border-t
                                                    border-white/5
                                                    px-5
                                                    py-4
                                                "
                                            >

                                                <div>

                                                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600">
                                                        Informatika
                                                    </p>

                                                    <p className="mt-1 text-xs text-slate-400">
                                                        Universitas Khairun
                                                    </p>

                                                </div>

                                                <div
                                                    className="
                                                        text-xs
                                                        font-medium
                                                        text-slate-600
                                                        transition
                                                        group-hover:text-blue-400
                                                    "
                                                >
                                                    2025
                                                </div>

                                            </div>

                                        </article>

                                    );

                                })}

                            </div>

                        )}

                </div>

            </section>

            {/* ================================================= */}
            {/* BOTTOM CTA */}
            {/* ================================================= */}

            <section className="px-5 pb-24 sm:px-8">

                <div
                    className="
                        relative
                        mx-auto
                        max-w-6xl
                        overflow-hidden
                        rounded-[32px]
                        border
                        border-blue-500/20
                        bg-gradient-to-br
                        from-blue-600/10
                        via-slate-900
                        to-cyan-500/5
                        px-6
                        py-12
                        text-center
                        sm:px-12
                        sm:py-16
                    "
                >

                    <div
                        className="
                            absolute
                            left-1/2
                            top-0
                            h-40
                            w-40
                            -translate-x-1/2
                            rounded-full
                            bg-blue-500/10
                            blur-3xl
                        "
                    />

                    <div className="relative">

                        <p className="text-xs font-bold uppercase tracking-[0.35em] text-blue-400">
                            25 Savage
                        </p>

                        <h2 className="mt-4 text-3xl font-black sm:text-4xl">

                            Satu Angkatan.
                            <br />

                            <span className="text-slate-500">
                                Banyak Cerita.
                            </span>

                        </h2>

                        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500">

                            Kenangan hari ini menjadi cerita yang akan
                            kita bawa di masa depan.

                        </p>

                        <Link
                            href="/mahasiswa"
                            className="
                                mt-7
                                inline-flex
                                items-center
                                gap-3
                                rounded-2xl
                                bg-blue-600
                                px-7
                                py-3.5
                                text-sm
                                font-bold
                                shadow-xl
                                shadow-blue-600/20
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:bg-blue-500
                                hover:shadow-blue-500/30
                            "
                        >
                            Kenali Angkatan

                            <span className="text-lg">
                                →
                            </span>

                        </Link>

                    </div>

                </div>

            </section>

            {/* FOOTER */}

            <footer className="border-t border-white/10 px-5 py-8 text-center">

                <p className="text-xs text-slate-600 sm:text-sm">
                    © 2025 Informatika 25 — Universitas Khairun
                </p>

            </footer>

        </main>
    );
}