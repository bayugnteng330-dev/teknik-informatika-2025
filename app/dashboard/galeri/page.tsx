"use client";

import {
    ChangeEvent,
    FormEvent,
    useEffect,
    useState,
} from "react";
import Link from "next/link";

type Galeri = {
    id: number;
    judul: string;
    deskripsi: string | null;
    foto: string | null;
    created_at: string;
};

const API =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://trustworthy-strength-production-497e.up.railway.app/api";

const SERVER =
    API.replace(/\/api\/?$/, "");

export default function GaleriDashboard() {
    const [data, setData] = useState<Galeri[]>([]);

    const [judul, setJudul] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [foto, setFoto] = useState<File | null>(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // =========================================
    // CEK LOGIN
    // =========================================

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href = "/login";
            return;
        }

        loadData();
    }, []);

    // =========================================
    // AMBIL DATA GALERI
    // =========================================

    const loadData = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(`${API}/galeri`, {
                cache: "no-store",
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message ||
                    "Gagal mengambil data galeri"
                );
            }

            setData(result.data || []);
        } catch (err) {
            console.error(err);

            setError(
                err instanceof Error
                    ? err.message
                    : "Gagal mengambil data galeri"
            );
        } finally {
            setLoading(false);
        }
    };

    // =========================================
    // PILIH FOTO
    // =========================================

    const handleFoto = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const file =
            e.target.files?.[0] || null;

        setFoto(file);
    };

    // =========================================
    // RESET FORM
    // =========================================

    const resetForm = () => {
        setJudul("");
        setDeskripsi("");
        setFoto(null);

        const input =
            document.getElementById(
                "foto"
            ) as HTMLInputElement;

        if (input) {
            input.value = "";
        }
    };

    // =========================================
    // TAMBAH GALERI
    // =========================================

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setSaving(true);
        setMessage("");
        setError("");

        try {
            const token =
                localStorage.getItem("token");

            if (!token) {
                window.location.href = "/login";
                return;
            }

            const formData =
                new FormData();

            formData.append(
                "judul",
                judul
            );

            formData.append(
                "deskripsi",
                deskripsi
            );

            if (foto) {
                formData.append(
                    "foto",
                    foto
                );
            }

            const response =
                await fetch(
                    `${API}/galeri`,
                    {
                        method: "POST",
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                        body: formData,
                    }
                );

            const result =
                await response.json();

            if (
                response.status === 401 ||
                response.status === 403
            ) {
                localStorage.removeItem(
                    "token"
                );

                window.location.href =
                    "/login";

                return;
            }

            if (!response.ok) {
                throw new Error(
                    result.message ||
                    result.error ||
                    "Gagal menambahkan foto"
                );
            }

            setMessage(
                "Foto galeri berhasil ditambahkan."
            );

            resetForm();

            await loadData();

        } catch (err) {
            console.error(err);

            setError(
                err instanceof Error
                    ? err.message
                    : "Gagal menambahkan foto"
            );
        } finally {
            setSaving(false);
        }
    };

    // =========================================
    // HAPUS GALERI
    // =========================================

    const handleDelete = async (
        id: number
    ) => {
        const yakin = confirm(
            "Yakin ingin menghapus foto ini?"
        );

        if (!yakin) {
            return;
        }

        try {
            setMessage("");
            setError("");

            const token =
                localStorage.getItem("token");

            if (!token) {
                window.location.href =
                    "/login";
                return;
            }

            const response =
                await fetch(
                    `${API}/galeri/${id}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );

            const result =
                await response.json();

            if (
                response.status === 401 ||
                response.status === 403
            ) {
                localStorage.removeItem(
                    "token"
                );

                window.location.href =
                    "/login";

                return;
            }

            if (!response.ok) {
                throw new Error(
                    result.message ||
                    result.error ||
                    "Gagal menghapus foto"
                );
            }

            setMessage(
                "Foto galeri berhasil dihapus."
            );

            await loadData();

        } catch (err) {
            console.error(err);

            setError(
                err instanceof Error
                    ? err.message
                    : "Gagal menghapus foto"
            );
        }
    };

    // =========================================
    // LOGOUT
    // =========================================

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    // =========================================
    // TAMPILAN
    // =========================================

    return (
        <main className="min-h-screen bg-slate-950 text-white">

            {/* SIDEBAR */}

            <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-white/10 bg-slate-900 lg:block">

                <div className="flex h-full flex-col">

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
                            className="flex items-center gap-3 rounded-xl bg-blue-600 px-4 py-3 font-semibold"
                        >
                            <span>🖼️</span>
                            Galeri
                        </Link>

                        <Link
                            href="/dashboard/informasi"
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-400 transition hover:bg-white/5 hover:text-white"
                        >
                            <span>📢</span>
                            Informasi
                        </Link>

                    </nav>

                    <div className="border-t border-white/10 p-4">

                        <Link
                            href="/"
                            className="mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
                        >
                            <span>🌐</span>
                            Website
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-red-400 hover:bg-red-500/10"
                        >
                            <span>🚪</span>
                            Logout
                        </button>

                    </div>

                </div>

            </aside>

            {/* CONTENT */}

            <div className="lg:ml-64">

                {/* HEADER */}

                <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 backdrop-blur">

                    <div className="px-6 py-5 md:px-8">

                        <p className="text-sm text-slate-500">
                            Dashboard
                        </p>

                        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">

                            <div>

                                <h1 className="text-2xl font-bold">
                                    Kelola Galeri
                                </h1>

                                <p className="mt-1 text-sm text-slate-500">
                                    Tambahkan dan kelola
                                    dokumentasi Angkatan 2025.
                                </p>

                            </div>

                            <div className="rounded-xl bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
                                {data.length} Foto
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
                            ! {error}
                        </div>
                    )}

                    {/* FORM */}

                    <section className="rounded-2xl border border-white/10 bg-white/5 p-6">

                        <div className="mb-6">

                            <h2 className="text-xl font-bold">
                                Tambah Foto Galeri
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Tambahkan dokumentasi kegiatan
                                mahasiswa.
                            </p>

                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            {/* JUDUL */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Judul Foto
                                </label>

                                <input
                                    type="text"
                                    value={judul}
                                    onChange={(e) =>
                                        setJudul(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Contoh: Kegiatan Bersama"
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none transition focus:border-blue-500"
                                />

                            </div>

                            {/* DESKRIPSI */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Deskripsi
                                </label>

                                <textarea
                                    value={deskripsi}
                                    onChange={(e) =>
                                        setDeskripsi(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Deskripsi foto..."
                                    rows={4}
                                    className="w-full resize-none rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none transition focus:border-blue-500"
                                />

                            </div>

                            {/* FOTO */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Foto
                                </label>

                                <input
                                    id="foto"
                                    type="file"
                                    accept="image/png,image/jpeg,image/jpg,image/webp"
                                    onChange={handleFoto}
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white"
                                />

                                {foto && (
                                    <p className="mt-2 text-xs text-slate-500">
                                        File: {foto.name}
                                    </p>
                                )}

                            </div>

                            {/* BUTTON */}

                            <button
                                type="submit"
                                disabled={saving}
                                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {saving
                                    ? "Mengupload..."
                                    : "➕ Tambah Foto"}
                            </button>

                        </form>

                    </section>

                    {/* DAFTAR */}

                    <section className="mt-10">

                        <div className="mb-5">

                            <h2 className="text-xl font-bold">
                                Daftar Galeri
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Foto yang tersimpan di database.
                            </p>

                        </div>

                        {loading ? (

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
                                <div className="text-4xl">
                                    ⏳
                                </div>

                                <p className="mt-3 text-slate-400">
                                    Memuat data...
                                </p>
                            </div>

                        ) : data.length === 0 ? (

                            <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-12 text-center">

                                <div className="text-5xl">
                                    📷
                                </div>

                                <h3 className="mt-4 text-lg font-bold">
                                    Belum ada foto
                                </h3>

                                <p className="mt-2 text-sm text-slate-500">
                                    Tambahkan foto menggunakan
                                    form di atas.
                                </p>

                            </div>

                        ) : (

                            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

                                {data.map((item) => (

                                    <article
                                        key={item.id}
                                        className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                                    >

                                        {/* FOTO */}

                                        <div className="h-56 bg-slate-900">

                                            {item.foto ? (

                                                <img
                                                    src={`${SERVER}/uploads/${item.foto}`}
                                                    alt={item.judul}
                                                    className="h-full w-full object-cover"
                                                />

                                            ) : (

                                                <div className="flex h-full items-center justify-center text-5xl">
                                                    📷
                                                </div>

                                            )}

                                        </div>

                                        {/* INFO */}

                                        <div className="p-5">

                                            <h3 className="font-bold">
                                                {item.judul}
                                            </h3>

                                            {item.deskripsi && (
                                                <p className="mt-2 line-clamp-3 text-sm text-slate-500">
                                                    {item.deskripsi}
                                                </p>
                                            )}

                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        item.id
                                                    )
                                                }
                                                className="mt-5 rounded-lg bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
                                            >
                                                🗑️ Hapus
                                            </button>

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