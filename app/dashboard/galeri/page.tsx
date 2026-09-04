import Link from "next/link";

type Galeri = {
    id: number;
    judul: string;
    deskripsi: string | null;
    foto: string | null;
    created_at: string;
};

const API_SERVER =
    process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
    "http://localhost:5000";

async function getGaleri(): Promise<Galeri[]> {
    try {
        const response = await fetch(`${API_SERVER}/api/galeri`, {
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error("Gagal mengambil data galeri");
        }

        const result = await response.json();

        return result.data || [];
    } catch (error) {
        console.error("Error mengambil galeri:", error);
        return [];
    }
}

export default async function GaleriPage() {
    const galeri = await getGaleri();

    return (
        <main className="min-h-screen overflow-hidden bg-[#030712] text-white">

            {/* BACKGROUND */}
            <div className="pointer-events-none fixed inset-0 -z-10">

                <div className="absolute left-[-200px] top-[-200px] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]" />

                <div className="absolute right-[-200px] top-[30%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />

                <div className="absolute bottom-[-200px] left-[30%] h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[120px]" />

            </div>


            {/* HERO */}

            <section className="relative px-5 pb-16 pt-28 sm:px-6 sm:pt-32">

                <div className="mx-auto max-w-5xl text-center">

                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-blue-400">

                        <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />

                        Informatika 2025

                    </div>


                    <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">

                        Galeri{" "}

                        <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            Angkatan
                        </span>

                    </h1>


                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">

                        Dokumentasi kegiatan, kebersamaan, dan
                        perjalanan mahasiswa Teknik Informatika
                        Angkatan 2025.

                    </p>


                    {/* JUMLAH FOTO */}

                    <div className="mt-7 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 backdrop-blur-xl">

                        <span className="text-2xl">
                            📸
                        </span>

                        <div className="text-left">

                            <p className="text-lg font-bold">
                                {galeri.length}
                            </p>

                            <p className="text-xs text-slate-500">
                                Dokumentasi
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* GALERI */}

            <section className="px-5 pb-24 sm:px-6">

                <div className="mx-auto max-w-7xl">

                    {galeri.length === 0 ? (

                        <div className="rounded-[28px] border border-white/10 bg-white/[0.03] px-6 py-20 text-center backdrop-blur-xl">

                            <div className="text-6xl">
                                📷
                            </div>

                            <h2 className="mt-5 text-2xl font-bold">
                                Belum Ada Galeri
                            </h2>

                            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                                Foto kegiatan angkatan belum tersedia.
                            </p>

                        </div>

                    ) : (

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                            {galeri.map((item, index) => (

                                <article
                                    key={item.id}
                                    className={`
                                        group
                                        overflow-hidden
                                        rounded-[26px]
                                        border
                                        border-white/10
                                        bg-[#0b1120]/80
                                        shadow-[0_20px_60px_rgba(0,0,0,0.3)]
                                        backdrop-blur-xl
                                        transition-all
                                        duration-500
                                        hover:-translate-y-2
                                        hover:border-blue-500/40
                                        hover:shadow-[0_30px_80px_rgba(37,99,235,0.12)]
                                        ${index === 0 ? "lg:col-span-2" : ""}
                                    `}
                                >

                                    {/* FOTO */}

                                    <div
                                        className={`
                                            relative
                                            overflow-hidden
                                            bg-slate-900
                                            ${index === 0
                                                ? "h-80 sm:h-[420px]"
                                                : "h-72 sm:h-80"
                                            }
                                        `}
                                    >

                                        {item.foto ? (

                                            <img
                                                src={`${API_SERVER}/uploads/${item.foto}`}
                                                alt={item.judul}
                                                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                                            />

                                        ) : (

                                            <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950">

                                                <div className="text-center">

                                                    <div className="text-6xl">
                                                        📷
                                                    </div>

                                                    <p className="mt-3 text-sm text-slate-500">
                                                        Foto belum tersedia
                                                    </p>

                                                </div>

                                            </div>

                                        )}


                                        {/* GRADIENT OVERLAY */}

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-70 transition duration-500 group-hover:opacity-90" />


                                        {/* NOMOR */}

                                        <div className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-xs font-bold backdrop-blur-md">
                                            {String(index + 1).padStart(2, "0")}
                                        </div>


                                        {/* LABEL */}

                                        <div className="absolute right-5 top-5 rounded-full border border-blue-400/20 bg-blue-500/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-300 backdrop-blur-md">

                                            Informatika 25

                                        </div>


                                        {/* INFO DI ATAS FOTO */}

                                        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">

                                            <h2 className="text-xl font-black leading-tight text-white sm:text-2xl">

                                                {item.judul}

                                            </h2>

                                            {item.deskripsi && (

                                                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-300">

                                                    {item.deskripsi}

                                                </p>

                                            )}

                                        </div>

                                    </div>


                                    {/* FOOTER CARD */}

                                    <div className="flex items-center justify-between px-5 py-4">

                                        <div>

                                            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                                                Dokumentasi
                                            </p>

                                            <p className="mt-1 text-xs text-slate-400">
                                                Teknik Informatika 2025
                                            </p>

                                        </div>


                                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-sm text-slate-400 transition group-hover:border-blue-500/30 group-hover:bg-blue-500/10 group-hover:text-blue-400">

                                            ↗

                                        </div>

                                    </div>

                                </article>

                            ))}

                        </div>

                    )}

                </div>

            </section>


            {/* CTA */}

            <section className="px-5 pb-20 sm:px-6">

                <div className="mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-blue-500/20 bg-gradient-to-br from-blue-600/10 via-slate-900 to-cyan-500/5 p-8 text-center sm:p-12">

                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-400">
                        Informatika 25
                    </p>

                    <h2 className="mt-3 text-2xl font-black sm:text-3xl">
                        Setiap momen punya cerita.
                    </h2>

                    <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
                        Dokumentasikan perjalanan dan kebersamaan
                        keluarga besar Teknik Informatika Angkatan 2025.
                    </p>

                    <Link
                        href="/mahasiswa"
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold shadow-lg shadow-blue-600/20 transition hover:-translate-y-1 hover:bg-blue-500"
                    >
                        Lihat Mahasiswa
                        <span>→</span>
                    </Link>

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
