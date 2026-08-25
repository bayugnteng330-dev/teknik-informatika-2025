"use client";

import { FormEvent, useState } from "react";

const WHATSAPP_NUMBER = "6281234567890";

export default function KontakPage() {
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [pesan, setPesan] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const text = `Halo Informatika 25 👋

Nama: ${nama}
Email: ${email}

Pesan:
${pesan}`;

        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            text
        )}`;

        window.open(url, "_blank");
    };

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#030712] px-4 pb-16 pt-24 text-white sm:px-6 sm:pb-24 sm:pt-28">

            {/* ================= BACKGROUND ================= */}

            <div className="pointer-events-none absolute left-[-180px] top-20 h-[350px] w-[350px] rounded-full bg-blue-600/10 blur-[110px] sm:h-[450px] sm:w-[450px] sm:blur-[130px]" />

            <div className="pointer-events-none absolute right-[-180px] top-[350px] h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-[120px] sm:h-[500px] sm:w-[500px] sm:blur-[150px]" />

            <div className="pointer-events-none absolute bottom-[-180px] left-1/2 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-blue-500/5 blur-[100px] sm:h-[400px] sm:w-[400px] sm:blur-[120px]" />


            {/* ================= HEADER ================= */}

            <section className="relative mx-auto mb-10 max-w-7xl text-center sm:mb-14">

                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-blue-400 backdrop-blur-xl sm:px-5 sm:text-xs sm:tracking-[0.3em]">

                    <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />

                    Informatika 25

                </div>

                <h1 className="text-3xl font-black tracking-tight sm:text-5xl md:text-6xl">
                    Hubungi Kami
                </h1>

                <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-400 sm:mt-5 sm:text-base sm:leading-7">
                    Punya pertanyaan, saran, atau ingin terhubung dengan
                    keluarga besar Teknik Informatika Angkatan 2025?
                    Kami siap mendengarkan.
                </p>

            </section>


            {/* ================= CONTENT ================= */}

            <section className="relative mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:gap-7 lg:grid-cols-[0.9fr_1.1fr]">


                {/* ================= LEFT ================= */}

                <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-2xl sm:rounded-[28px] sm:p-8">

                    <div className="mb-6 sm:mb-8">

                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-400 sm:text-xs sm:tracking-[0.3em]">
                            Get in touch
                        </span>

                        <h2 className="mt-2 text-2xl font-bold sm:mt-3 sm:text-3xl">
                            Informasi Kontak
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-gray-500 sm:mt-3">
                            Temukan kami melalui beberapa kontak berikut.
                        </p>

                    </div>


                    {/* EMAIL */}

                    <div className="group mb-4 flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.025] p-3.5 transition-all duration-300 hover:border-blue-500/30 hover:bg-blue-500/[0.05] sm:mb-5 sm:gap-4 sm:p-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-xl ring-1 ring-blue-500/10 sm:h-14 sm:w-14 sm:rounded-2xl sm:text-2xl">
                            ✉️
                        </div>

                        <div className="min-w-0">

                            <p className="text-sm font-semibold text-gray-300">
                                Email
                            </p>

                            <a
                                href="mailto:informatika2025@gmail.com"
                                className="mt-1 block truncate text-sm text-gray-500 transition hover:text-blue-400"
                            >
                                informatika2025@gmail.com
                            </a>

                        </div>

                    </div>


                    {/* WHATSAPP */}

                    <div className="group mb-4 flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.025] p-3.5 transition-all duration-300 hover:border-green-500/30 hover:bg-green-500/[0.05] sm:mb-5 sm:gap-4 sm:p-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-xl ring-1 ring-green-500/10 sm:h-14 sm:w-14 sm:rounded-2xl sm:text-2xl">
                            📱
                        </div>

                        <div>

                            <p className="text-sm font-semibold text-gray-300">
                                WhatsApp
                            </p>

                            <a
                                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-1 block text-sm text-green-400 transition hover:text-green-300"
                            >
                                +62 812-3456-7890
                            </a>

                        </div>

                    </div>


                    {/* LOCATION */}

                    <div className="group mb-5 flex gap-3 rounded-2xl border border-white/5 bg-white/[0.025] p-3.5 transition-all duration-300 hover:border-red-500/30 hover:bg-red-500/[0.05] sm:mb-7 sm:gap-4 sm:p-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-xl ring-1 ring-red-500/10 sm:h-14 sm:w-14 sm:rounded-2xl sm:text-2xl">
                            📍
                        </div>

                        <div className="min-w-0">

                            <p className="text-sm font-semibold text-gray-300">
                                Lokasi
                            </p>

                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                Jati, Kec. Ternate Sel., Kota Ternate,
                                Maluku Utara
                            </p>

                        </div>

                    </div>


                    {/* MAP */}

                    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-black/20">

                        <div className="relative h-[220px] overflow-hidden sm:h-[300px]">

                            <iframe
                                title="Lokasi Jati, Ternate"
                                src="https://www.google.com/maps?q=Q9GF%2BFQ5%2C%20Jati%2C%20Kec.%20Ternate%20Sel.%2C%20Kota%20Ternate%2C%20Maluku%20Utara&output=embed"
                                className="h-full w-full grayscale-[20%] opacity-80 transition duration-700 group-hover:opacity-100"
                                loading="lazy"
                            />

                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080c17]/40 via-transparent to-transparent" />

                        </div>

                    </div>

                </div>


                {/* ================= RIGHT ================= */}

                <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-2xl sm:rounded-[28px] sm:p-8">

                    <div className="mb-6 sm:mb-8">

                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-400 sm:text-xs sm:tracking-[0.3em]">
                            Send message
                        </span>

                        <h2 className="mt-2 text-2xl font-bold sm:mt-3 sm:text-3xl">
                            Kirim Pesan
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-gray-500 sm:mt-3">
                            Isi form berikut dan pesan akan langsung
                            diarahkan ke WhatsApp.
                        </p>

                    </div>


                    {/* FORM */}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5 sm:space-y-6"
                    >

                        {/* NAMA */}

                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-300">
                                Nama
                            </label>

                            <input
                                type="text"
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                                placeholder="Masukkan nama"
                                required
                                className="h-13 w-full rounded-xl border border-white/10 bg-[#0b1220] px-4 text-base text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500/60 focus:bg-blue-500/[0.03] focus:ring-4 focus:ring-blue-500/10 sm:h-14 sm:rounded-2xl sm:px-5 sm:text-sm"
                            />

                        </div>


                        {/* EMAIL */}

                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-300">
                                Email
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Masukkan email"
                                required
                                className="h-13 w-full rounded-xl border border-white/10 bg-[#0b1220] px-4 text-base text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500/60 focus:bg-blue-500/[0.03] focus:ring-4 focus:ring-blue-500/10 sm:h-14 sm:rounded-2xl sm:px-5 sm:text-sm"
                            />

                        </div>


                        {/* PESAN */}

                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-300">
                                Pesan
                            </label>

                            <textarea
                                value={pesan}
                                onChange={(e) => setPesan(e.target.value)}
                                placeholder="Tulis pesan..."
                                required
                                rows={6}
                                className="w-full resize-none rounded-xl border border-white/10 bg-[#0b1220] px-4 py-3 text-base text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500/60 focus:bg-blue-500/[0.03] focus:ring-4 focus:ring-blue-500/10 sm:rounded-2xl sm:px-5 sm:py-4 sm:text-sm"
                            />

                        </div>


                        {/* BUTTON */}

                        <button
                            type="submit"
                            className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-4 text-sm font-bold text-white shadow-[0_10px_35px_rgba(14,165,233,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_45px_rgba(14,165,233,0.35)] active:translate-y-0 sm:rounded-2xl"
                        >

                            <span className="relative z-10 flex items-center justify-center gap-3">
                                Kirim ke WhatsApp

                                <span className="transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>

                            </span>

                        </button>

                    </form>


                    {/* BOTTOM INFO */}

                    <div className="mt-6 flex items-start gap-3 rounded-2xl border border-blue-500/10 bg-blue-500/[0.04] p-3.5 sm:mt-8 sm:items-center sm:p-4">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10">
                            💬
                        </div>

                        <p className="text-xs leading-5 text-gray-500">
                            Pesan akan dibuka secara otomatis melalui
                            WhatsApp setelah form dikirim.
                        </p>

                    </div>

                </div>

            </section>

        </main>
    );
}

