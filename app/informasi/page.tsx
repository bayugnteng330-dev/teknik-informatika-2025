"use client";

import { useEffect, useState } from "react";

type Informasi = {
    id: number;
    judul: string;
    isi: string;
    created_at?: string;
};

// ==========================================
// API RAILWAY
// ==========================================

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


    // ==========================================
    // AMBIL DATA INFORMASI
    // ==========================================

    const getInformasi = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await fetch(
                `${API}/informasi`,
                {
                    cache: "no-store",
                }
            );

            const result = await response.json();

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


    // ==========================================
    // LOAD DATA SAAT HALAMAN DIBUKA
    // ==========================================

    useEffect(() => {

        getInformasi();

    }, []);


    return (

        <main className="min-h-screen bg-slate-950 text-white">


            {/* ==========================================
                HERO INFORMASI
            ========================================== */}

            <section
                className="
                    relative
                    overflow-hidden
                    border-b
                    border-white/5
                "
            >

                {/* Background Glow */}

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
                        absolute
                        right-0
                        top-20
                        h-60
                        w-60
                        rounded-full
                        bg-cyan-500/5
                        blur-3xl
                    "
                />


                <div
                    className="
                        relative
                        mx-auto
                        max-w-6xl
                        px-6
                        py-20
                        text-center
                        md:py-28
                    "
                >

                    {/* Icon */}

                    <div
                        className="
                            mx-auto
                            flex
                            h-20
                            w-20
                            items-center
                            justify-center
                            rounded-3xl
                            border
                            border-blue-500/20
                            bg-blue-500/10
                            text-4xl
                            shadow-2xl
                            shadow-blue-500/10
                        "
                    >
                        📢
                    </div>


                    {/* Label */}

                    <p
                        className="
                            mt-6
                            text-xs
                            font-bold
                            uppercase
                            tracking-[0.35em]
                            text-blue-400
                            md:text-sm
                        "
                    >
                        Informatika 2025
                    </p>


                    {/* Title */}

                    <h1
                        className="
                            mt-3
                            text-4xl
                            font-black
                            tracking-tight
                            md:text-6xl
                        "
                    >
                        Informasi
                    </h1>


                    {/* Description */}

                    <p
                        className="
                            mx-auto
                            mt-5
                            max-w-2xl
                            text-sm
                            leading-7
                            text-slate-400
                            md:text-base
                        "
                    >
                        Temukan berbagai informasi,
                        pengumuman, dan kabar terbaru
                        dari Teknik Informatika Angkatan 2025.
                    </p>

                </div>

            </section>



            {/* ==========================================
                CONTENT
            ========================================== */}

            <section
                className="
                    mx-auto
                    max-w-5xl
                    px-6
                    py-16
                    md:py-20
                "
            >


                {/* ==========================================
                    LOADING
                ========================================== */}

                {loading && (

                    <div
                        className="
                            rounded-3xl
                            border
                            border-white/10
                            bg-white/[0.03]
                            p-12
                            text-center
                            backdrop-blur-xl
                        "
                    >

                        <div
                            className="
                                mx-auto
                                flex
                                h-16
                                w-16
                                animate-pulse
                                items-center
                                justify-center
                                rounded-2xl
                                bg-blue-500/10
                                text-3xl
                            "
                        >
                            ⏳
                        </div>


                        <h2
                            className="
                                mt-5
                                text-lg
                                font-bold
                            "
                        >
                            Memuat Informasi
                        </h2>


                        <p
                            className="
                                mt-2
                                text-sm
                                text-slate-500
                            "
                        >
                            Mohon tunggu sebentar...
                        </p>

                    </div>

                )}



                {/* ==========================================
                    ERROR
                ========================================== */}

                {!loading && error && (

                    <div
                        className="
                            rounded-3xl
                            border
                            border-red-500/20
                            bg-red-500/5
                            p-10
                            text-center
                        "
                    >

                        <div
                            className="
                                mx-auto
                                flex
                                h-16
                                w-16
                                items-center
                                justify-center
                                rounded-2xl
                                bg-red-500/10
                                text-3xl
                            "
                        >
                            ⚠️
                        </div>


                        <h2
                            className="
                                mt-5
                                text-xl
                                font-bold
                                text-white
                            "
                        >
                            Gagal Memuat Informasi
                        </h2>


                        <p
                            className="
                                mx-auto
                                mt-3
                                max-w-lg
                                text-sm
                                leading-6
                                text-red-300
                            "
                        >
                            {error}
                        </p>


                        <button
                            onClick={getInformasi}
                            className="
                                mt-6
                                rounded-xl
                                bg-red-500/10
                                px-5
                                py-3
                                text-sm
                                font-semibold
                                text-red-300
                                transition
                                hover:bg-red-500/20
                            "
                        >
                            🔄 Coba Lagi
                        </button>

                    </div>

                )}



                {/* ==========================================
                    DATA KOSONG
                ========================================== */}

                {!loading &&
                    !error &&
                    informasi.length === 0 && (

                        <div
                            className="
                                rounded-3xl
                                border
                                border-dashed
                                border-white/10
                                bg-white/[0.03]
                                p-12
                                text-center
                            "
                        >

                            <div
                                className="
                                    mx-auto
                                    flex
                                    h-20
                                    w-20
                                    items-center
                                    justify-center
                                    rounded-3xl
                                    bg-white/5
                                    text-4xl
                                "
                            >
                                📭
                            </div>


                            <h2
                                className="
                                    mt-6
                                    text-xl
                                    font-bold
                                "
                            >
                                Belum Ada Informasi
                            </h2>


                            <p
                                className="
                                    mx-auto
                                    mt-3
                                    max-w-md
                                    text-sm
                                    leading-6
                                    text-slate-500
                                "
                            >
                                Belum ada informasi atau
                                pengumuman yang dipublikasikan
                                oleh admin.
                            </p>

                        </div>

                    )}



                {/* ==========================================
                    LIST INFORMASI
                ========================================== */}

                {!loading &&
                    !error &&
                    informasi.length > 0 && (

                        <div
                            className="
                                space-y-6
                            "
                        >

                            {/* Jumlah Informasi */}

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                "
                            >

                                <div>

                                    <p
                                        className="
                                            text-sm
                                            text-slate-500
                                        "
                                    >
                                        Total Informasi
                                    </p>


                                    <p
                                        className="
                                            mt-1
                                            text-2xl
                                            font-black
                                        "
                                    >
                                        {informasi.length}
                                    </p>

                                </div>


                                <div
                                    className="
                                        rounded-full
                                        border
                                        border-blue-500/20
                                        bg-blue-500/10
                                        px-4
                                        py-2
                                        text-xs
                                        font-semibold
                                        text-blue-400
                                    "
                                >
                                    📢 Terbaru
                                </div>

                            </div>



                            {/* Cards */}

                            {informasi.map(
                                (item) => (

                                    <article
                                        key={item.id}
                                        className="
                                            group
                                            relative
                                            overflow-hidden
                                            rounded-3xl
                                            border
                                            border-white/10
                                            bg-white/[0.03]
                                            p-6
                                            backdrop-blur-xl
                                            transition
                                            duration-300
                                            hover:-translate-y-1
                                            hover:border-blue-500/30
                                            hover:bg-white/[0.05]
                                            md:p-8
                                        "
                                    >

                                        {/* Card Glow */}

                                        <div
                                            className="
                                                pointer-events-none
                                                absolute
                                                -right-20
                                                -top-20
                                                h-40
                                                w-40
                                                rounded-full
                                                bg-blue-500/5
                                                blur-3xl
                                                transition
                                                group-hover:bg-blue-500/10
                                            "
                                        />


                                        <div
                                            className="
                                                relative
                                                flex
                                                flex-col
                                                gap-6
                                                md:flex-row
                                            "
                                        >


                                            {/* Icon */}

                                            <div
                                                className="
                                                    flex
                                                    h-14
                                                    w-14
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-2xl
                                                    border
                                                    border-blue-500/20
                                                    bg-blue-500/10
                                                    text-2xl
                                                "
                                            >
                                                📢
                                            </div>



                                            {/* Content */}

                                            <div
                                                className="
                                                    min-w-0
                                                    flex-1
                                                "
                                            >


                                                {/* Header */}

                                                <div
                                                    className="
                                                        flex
                                                        flex-col
                                                        gap-3
                                                        md:flex-row
                                                        md:items-start
                                                        md:justify-between
                                                    "
                                                >

                                                    <h2
                                                        className="
                                                            text-xl
                                                            font-black
                                                            leading-tight
                                                            text-white
                                                            md:text-2xl
                                                        "
                                                    >
                                                        {item.judul}
                                                    </h2>


                                                    {/* Date */}

                                                    {item.created_at && (

                                                        <span
                                                            className="
                                                                shrink-0
                                                                rounded-full
                                                                bg-white/5
                                                                px-3
                                                                py-1.5
                                                                text-xs
                                                                text-slate-500
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



                                                {/* Divider */}

                                                <div
                                                    className="
                                                        my-5
                                                        h-px
                                                        bg-white/10
                                                    "
                                                />



                                                {/* Isi */}

                                                <p
                                                    className="
                                                        whitespace-pre-line
                                                        text-sm
                                                        leading-7
                                                        text-slate-400
                                                        md:text-base
                                                    "
                                                >
                                                    {item.isi}
                                                </p>

                                            </div>

                                        </div>

                                    </article>

                                )
                            )}

                        </div>

                    )}

            </section>



            {/* ==========================================
                FOOTER
            ========================================== */}

            <footer
                className="
                    border-t
                    border-white/10
                    bg-black/20
                "
            >

                <div
                    className="
                        mx-auto
                        max-w-6xl
                        px-6
                        py-10
                        text-center
                    "
                >

                    <div
                        className="
                            text-lg
                            font-black
                        "
                    >
                        INFORMATIKA
                        <span className="text-blue-500">
                            25
                        </span>
                    </div>


                    <p
                        className="
                            mt-2
                            text-sm
                            text-slate-500
                        "
                    >
                        Teknik Informatika Angkatan 2025
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


                    <div
                        className="
                            mx-auto
                            mt-6
                            h-px
                            max-w-md
                            bg-white/5
                        "
                    />


                    <p
                        className="
                            mt-6
                            text-xs
                            text-slate-600
                        "
                    >
                        © 2025 Informatika 25. All rights reserved.
                    </p>

                </div>

            </footer>

        </main>

    );
}