"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";

type Informasi = {
    id: number;
    judul: string;
    isi: string;
    created_at?: string;
};

const API =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api";

export default function AdminInformasi() {
    const [data, setData] = useState<Informasi[]>([]);

    const [judul, setJudul] = useState("");
    const [isi, setIsi] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // ==========================================
    // AMBIL DATA INFORMASI
    // ==========================================

    const loadData = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(`${API}/informasi`, {
                cache: "no-store",
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Gagal mengambil data informasi"
                );
            }

            setData(result.data || []);
        } catch (err) {
            console.error(err);

            setError(
                err instanceof Error
                    ? err.message
                    : "Gagal mengambil data informasi"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // ==========================================
    // TAMBAH INFORMASI
    // ==========================================

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setSaving(true);
        setMessage("");
        setError("");

        try {
            const response = await fetch(`${API}/informasi`, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    judul,
                    isi,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Gagal menambahkan informasi"
                );
            }

            setMessage("Informasi berhasil ditambahkan.");

            // Kosongkan form
            setJudul("");
            setIsi("");

            // Refresh data
            await loadData();
        } catch (err) {
            console.error(err);

            setError(
                err instanceof Error
                    ? err.message
                    : "Gagal menambahkan informasi"
            );
        } finally {
            setSaving(false);
        }
    };

    // ==========================================
    // HAPUS INFORMASI
    // ==========================================

    const handleDelete = async (id: number) => {
        const yakin = confirm(
            "Yakin ingin menghapus informasi ini?"
        );

        if (!yakin) {
            return;
        }

        try {
            setMessage("");
            setError("");

            const response = await fetch(
                `${API}/informasi/${id}`,
                {
                    method: "DELETE",
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Gagal menghapus informasi"
                );
            }

            setMessage("Informasi berhasil dihapus.");

            await loadData();
        } catch (err) {
            console.error(err);

            setError(
                err instanceof Error
                    ? err.message
                    : "Gagal menghapus informasi"
            );
        }
    };

    // ==========================================
    // LOGOUT
    // ==========================================

    const handleLogout = () => {
        window.location.href = "/login";
    };

    return (
        <main className="min-h-screen bg-slate-950 text-white">

            {/* ================================= */}
            {/* SIDEBAR */}
            {/* ================================= */}

            <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-white/10 bg-slate-900 lg:block">

                <div className="flex h-full flex-col">

                    {/* LOGO */}

                    <div className="border-b border-white/10 px-6 py-6">

                        <Link
                            href="/dashboard"
                            className="text-xl font-black"
                        >
                            INFORMATIKA
                            <span className="text-blue-500">
                                25
                            </span>
                        </Link>

                        <p className="mt-1 text-xs text-slate-500">
                            DASHBOARD ADMIN
                        </p>

                    </div>

                    {/* MENU */}

                    <nav className="flex-1 space-y-2 p-4">

                        <Link
                            href="/dashboard"
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-400 transition hover:bg-white/5 hover:text-white"
                        >
                            <span>📊</span>
                            Dashboard
                        </Link>

                        <Link
                            href="/dashboard/mahasiswa"
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-400 transition hover:bg-white/5 hover:text-white"
                        >
                            <span>👨‍🎓</span>
                            Mahasiswa
                        </Link>

                        <Link
                            href="/dashboard/galeri"
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-400 transition hover:bg-white/5 hover:text-white"
                        >
                            <span>🖼️</span>
                            Galeri
                        </Link>

                        <Link
                            href="/dashboard/informasi"
                            className="flex items-center gap-3 rounded-xl bg-blue-600 px-4 py-3 font-semibold"
                        >
                            <span>📢</span>
                            Informasi
                        </Link>

                    </nav>

                    {/* BOTTOM */}

                    <div className="border-t border-white/10 p-4">

                        <Link
                            href="/"
                            className="mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
                        >
                            <span>🌐</span>
                            Website
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-red-400 transition hover:bg-red-500/10"
                        >
                            <span>🚪</span>
                            Logout
                        </button>

                    </div>

                </div>

            </aside>

            {/* ================================= */}
            {/* CONTENT */}
            {/* ================================= */}

            <div className="lg:ml-64">

                {/* HEADER */}

                <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 backdrop-blur">

                    <div className="px-6 py-5 md:px-8">

                        <p className="text-sm text-slate-500">
                            Dashboard / Informasi
                        </p>

                        <div className="mt-1 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

                            <div>

                                <h1 className="text-2xl font-bold">
                                    Kelola Informasi
                                </h1>

                                <p className="mt-1 text-sm text-slate-500">
                                    Tambahkan dan kelola informasi
                                    Angkatan 2025.
                                </p>

                            </div>

                            <div className="rounded-xl bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
                                {data.length} Informasi
                            </div>

                        </div>

                    </div>

                </header>

                {/* MAIN */}

                <div className="p-6 md:p-8">

                    {/* NOTIFICATION */}

                    {message && (
                        <div className="mb-6 rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-green-400">
                            ✓ {message}
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
                            ⚠ {error}
                        </div>
                    )}

                    {/* ================================= */}
                    {/* FORM TAMBAH INFORMASI */}
                    {/* ================================= */}

                    <section className="rounded-2xl border border-white/10 bg-white/5 p-6">

                        <div className="mb-6">

                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-2xl">
                                📢
                            </div>

                            <h2 className="text-xl font-bold">
                                Tambah Informasi
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Buat informasi baru untuk mahasiswa
                                Angkatan 2025.
                            </p>

                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            {/* JUDUL */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Judul Informasi
                                </label>

                                <input
                                    type="text"
                                    value={judul}
                                    onChange={(e) =>
                                        setJudul(e.target.value)
                                    }
                                    placeholder="Contoh: Jadwal Ujian Semester"
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
                                />

                            </div>

                            {/* ISI */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Isi Informasi
                                </label>

                                <textarea
                                    value={isi}
                                    onChange={(e) =>
                                        setIsi(e.target.value)
                                    }
                                    placeholder="Tuliskan informasi atau pengumuman..."
                                    rows={7}
                                    required
                                    className="w-full resize-none rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
                                />

                            </div>

                            {/* BUTTON */}

                            <button
                                type="submit"
                                disabled={saving}
                                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {saving
                                    ? "Menyimpan..."
                                    : "➕ Tambah Informasi"}
                            </button>

                        </form>

                    </section>

                    {/* ================================= */}
                    {/* DAFTAR INFORMASI */}
                    {/* ================================= */}

                    <section className="mt-10">

                        <div className="mb-5">

                            <h2 className="text-xl font-bold">
                                Daftar Informasi
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Informasi yang tersimpan di database
                                MySQL.
                            </p>

                        </div>

                        {/* LOADING */}

                        {loading && (
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">

                                <div className="text-4xl">
                                    ⏳
                                </div>

                                <p className="mt-3 text-slate-400">
                                    Memuat data informasi...
                                </p>

                            </div>
                        )}

                        {/* KOSONG */}

                        {!loading && data.length === 0 && (
                            <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-12 text-center">

                                <div className="text-5xl">
                                    📭
                                </div>

                                <h3 className="mt-4 text-lg font-bold">
                                    Belum Ada Informasi
                                </h3>

                                <p className="mt-2 text-sm text-slate-500">
                                    Tambahkan informasi pertama
                                    menggunakan form di atas.
                                </p>

                            </div>
                        )}

                        {/* DATA */}

                        {!loading && data.length > 0 && (
                            <div className="space-y-5">

                                {data.map((item) => (
                                    <article
                                        key={item.id}
                                        className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-blue-500/30"
                                    >

                                        <div className="flex flex-col gap-5 md:flex-row md:justify-between">

                                            <div className="flex-1">

                                                <div className="flex items-start gap-4">

                                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-xl">
                                                        📢
                                                    </div>

                                                    <div>

                                                        <h3 className="text-lg font-bold">
                                                            {item.judul}
                                                        </h3>

                                                        {item.created_at && (
                                                            <p className="mt-1 text-xs text-slate-600">
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
                                                            </p>
                                                        )}

                                                    </div>

                                                </div>

                                                <div className="mt-5 rounded-xl bg-slate-900/70 p-5">

                                                    <p className="whitespace-pre-line text-sm leading-7 text-slate-400">
                                                        {item.isi}
                                                    </p>

                                                </div>

                                            </div>

                                            {/* HAPUS */}

                                            <div>

                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            item.id
                                                        )
                                                    }
                                                    className="rounded-xl bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
                                                >
                                                    🗑️ Hapus
                                                </button>

                                            </div>

                                        </div>

                                    </article>
                                ))}

                            </div>
                        )}

                    </section>

                </div>

            </div>

        </main>
    );
}