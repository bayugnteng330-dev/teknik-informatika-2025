"use client";

import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-[#030b18] text-white">

            {/* ========================= */}
            {/* BACKGROUND */}
            {/* ========================= */}

            <div className="absolute inset-0">

                {/* Glow kiri */}
                <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />

                {/* Glow kanan */}
                <div className="absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

                {/* Pattern geometris */}
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `
                            linear-gradient(30deg, rgba(30,64,175,0.15) 12%, transparent 12.5%, transparent 87%, rgba(30,64,175,0.15) 87.5%),
                            linear-gradient(150deg, rgba(30,64,175,0.15) 12%, transparent 12.5%, transparent 87%, rgba(30,64,175,0.15) 87.5%)
                        `,
                        backgroundSize: "90px 155px",
                    }}
                />

            </div>


            {/* ========================= */}
            {/* CONTENT */}
            {/* ========================= */}

            <div className="relative z-10 mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl items-center justify-center px-5 py-12">

                <div className="grid w-full items-center gap-12 lg:grid-cols-2">


                    {/* ========================= */}
                    {/* TEXT */}
                    {/* ========================= */}

                    <div className="order-2 text-center lg:order-1 lg:text-left">

                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-blue-400 sm:text-sm">
                            Universitas Khairun
                        </p>

                        <h1 className="text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
                            Mahasiswa
                            <br />
                            Teknik
                            <br />

                            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                Informatika
                            </span>
                        </h1>

                        <p className="mt-6 max-w-xl text-sm leading-7 text-slate-400 sm:text-base lg:mx-0">
                            Keluarga besar mahasiswa Teknik Informatika
                            Angkatan 2025. Bersama membangun solidaritas,
                            kreativitas, dan teknologi.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:justify-start">

                            <Link
                                href="/mahasiswa"
                                className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3.5 text-sm font-bold shadow-lg shadow-blue-600/20 transition duration-300 hover:-translate-y-1 hover:shadow-blue-500/40"
                            >
                                Mahasiswa
                            </Link>

                            <Link
                                href="/galeri"
                                className="rounded-xl border border-blue-500/30 bg-blue-500/5 px-7 py-3.5 text-sm font-bold text-blue-400 transition duration-300 hover:-translate-y-1 hover:bg-blue-500/10"
                            >
                                Galeri
                            </Link>

                        </div>

                    </div>


                    {/* ========================= */}
                    {/* LOGO AREA */}
                    {/* ========================= */}

                    <div className="order-1 flex justify-center lg:order-2">

                        <div className="relative flex h-[420px] w-[350px] items-center justify-center sm:h-[500px] sm:w-[420px] md:h-[580px] md:w-[500px]">


                            {/* ========================= */}
                            {/* OUTER GLOW */}
                            {/* ========================= */}

                            <div className="absolute h-[300px] w-[300px] rounded-full bg-blue-600/20 blur-[90px] sm:h-[380px] sm:w-[380px]" />


                            {/* ========================= */}
                            {/* TRIANGLE BELAKANG */}
                            {/* ========================= */}

                            <div
                                className="absolute h-[430px] w-[360px] bg-gradient-to-b from-blue-500/60 via-blue-700/30 to-transparent opacity-60 blur-[1px] sm:h-[520px] sm:w-[430px]"
                                style={{
                                    clipPath:
                                        "polygon(50% 0%, 100% 100%, 0% 100%)",
                                }}
                            />


                            {/* ========================= */}
                            {/* TRIANGLE TENGAH */}
                            {/* ========================= */}

                            <div
                                className="absolute h-[390px] w-[325px] bg-gradient-to-b from-blue-700 via-blue-600/60 to-blue-950 sm:h-[475px] sm:w-[395px]"
                                style={{
                                    clipPath:
                                        "polygon(50% 0%, 100% 100%, 0% 100%)",
                                }}
                            />


                            {/* ========================= */}
                            {/* TRIANGLE DALAM */}
                            {/* ========================= */}

                            <div
                                className="absolute h-[350px] w-[292px] bg-gradient-to-b from-[#071b3d] via-[#0b2855] to-[#030b18] sm:h-[425px] sm:w-[355px]"
                                style={{
                                    clipPath:
                                        "polygon(50% 0%, 100% 100%, 0% 100%)",
                                }}
                            />


                            {/* ========================= */}
                            {/* CIRCLE GLOW */}
                            {/* ========================= */}

                            <div className="absolute h-56 w-56 rounded-full bg-blue-500/20 blur-3xl sm:h-72 sm:w-72" />


                            {/* ========================= */}
                            {/* LOGO */}
                            {/* ========================= */}

                            <div className="relative z-10 flex h-[260px] w-[260px] items-center justify-center overflow-hidden rounded-full sm:h-[320px] sm:w-[320px]">

                                <img
                                    src="/hmti.jpg"
                                    alt="Logo HMTI"
                                    className="h-full w-full object-contain"
                                />

                            </div>


                            {/* ========================= */}
                            {/* BLUE LIGHT */}
                            {/* ========================= */}

                            <div className="absolute bottom-20 h-1 w-32 rounded-full bg-blue-400 shadow-[0_0_30px_10px_rgba(37,99,235,0.5)] sm:bottom-24" />

                        </div>

                    </div>

                </div>

            </div>


            {/* ========================= */}
            {/* SCROLL */}
            {/* ========================= */}

            <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-center md:block">

                <p className="text-[10px] uppercase tracking-[0.35em] text-slate-600">
                    Scroll untuk menjelajah
                </p>

                <div className="mx-auto mt-3 h-8 w-px bg-gradient-to-b from-blue-500 to-transparent" />

            </div>

        </section>
    );
}