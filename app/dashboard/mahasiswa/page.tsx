"use client";

import {
    ChangeEvent,
    FormEvent,
    useEffect,
    useState,
} from "react";
import Link from "next/link";

type Mahasiswa = {
    id: number;
    nama: string;
    nim: string;
    prodi: string;
    kelas: string;
    angkatan: string;
    whatsapp: string | null;
    instagram: string | null;
    foto: string | null;
    created_at?: string;
};

const API =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api";

const SERVER =
    process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
    "http://localhost:5000";

export default function MahasiswaDashboard() {
    const [data, setData] = useState<Mahasiswa[]>([]);

    const [nama, setNama] = useState("");
    const [nim, setNim] = useState("");
    const [prodi, setProdi] =
        useState("Teknik Informatika");
    const [kelas, setKelas] = useState("");
    const [angkatan, setAngkatan] =
        useState("2025");
    const [whatsapp, setWhatsapp] =
        useState("");
    const [instagram, setInstagram] =
        useState("");
    const [foto, setFoto] =
        useState<File | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");

    // =========================================
    // AMBIL DATA MAHASISWA
    // =========================================

    const loadData = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${API}/mahasiswa`,
                {
                    cache: "no-store",
                }
            );

            const result =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message ||
                    "Gagal mengambil data mahasiswa"
                );
            }

            setData(result.data || []);
        } catch (err) {
            console.error(err);

            setError(
                err instanceof Error
                    ? err.message
                    : "Gagal mengambil data mahasiswa"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

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
        setNama("");
        setNim("");
        setProdi("Teknik Informatika");
        setKelas("");
        setAngkatan("2025");
        setWhatsapp("");
        setInstagram("");
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
    // TAMBAH MAHASISWA
    // =========================================

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setSaving(true);
        setMessage("");
        setError("");

        try {
            const formData =
                new FormData();

            formData.append(
                "nama",
                nama
            );

            formData.append(
                "nim",
                nim
            );

            formData.append(
                "prodi",
                prodi
            );

            formData.append(
                "kelas",
                kelas
            );

            formData.append(
                "angkatan",
                angkatan
            );

            formData.append(
                "whatsapp",
                whatsapp
            );

            formData.append(
                "instagram",
                instagram
            );

            if (foto) {
                formData.append(
                    "foto",
                    foto
                );
            }

            const response =
                await fetch(
                    `${API}/mahasiswa`,
                    {
                        method: "POST",
                        credentials: "include",
                        body: formData,
                    }
                );

            const result =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message ||
                    "Gagal menambahkan mahasiswa"
                );
            }

            setMessage(
                "Mahasiswa berhasil ditambahkan."
            );

            resetForm();

            await loadData();
        } catch (err) {
            console.error(err);

            setError(
                err instanceof Error
                    ? err.message
                    : "Gagal menambahkan mahasiswa"
            );
        } finally {
            setSaving(false);
        }
    };

    // =========================================
    // HAPUS MAHASISWA
    // =========================================

    const handleDelete = async (
        id: number
    ) => {
        const yakin = confirm(
            "Yakin ingin menghapus mahasiswa ini?"
        );

        if (!yakin) {
            return;
        }

        try {
            setMessage("");
            setError("");

            const response =
                await fetch(
                    `${API}/mahasiswa/${id}`,
                    {
                        method: "DELETE",
                        credentials: "include",
                    }
                );

            const result =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message ||
                    "Gagal menghapus mahasiswa"
                );
            }

            setMessage(
                "Mahasiswa berhasil dihapus."
            );

            await loadData();
        } catch (err) {
            console.error(err);

            setError(
                err instanceof Error
                    ? err.message
                    : "Gagal menghapus mahasiswa"
            );
        }
    };

    // =========================================
    // LOGOUT
    // =========================================

    const handleLogout = async () => {
        try {
            await fetch(
                `${API}/auth/logout`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );
        } catch (error) {
            console.error(error);
        }

        window.location.href =
            "/login";
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
                            className="flex items-center gap-3 rounded-xl bg-blue-600 px-4 py-3 font-semibold"
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
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-400 transition hover:bg-white/5 hover:text-white"
                        >
                            <span>📢</span>
                            Informasi
                        </Link>

                    </nav>

                    {/* BOTTOM */}

                    <div className="border-t border-white/10 p-4">

                        <Link
                            href="/"
                            className="mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
                        >
                            <span>🌐</span>
                            Website
                        </Link>

                        <button
                            onClick={
                                handleLogout
                            }
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-red-400 hover:bg-red-500/10"
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
                            Dashboard
                        </p>

                        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">

                            <div>

                                <h1 className="text-2xl font-bold">
                                    Kelola Mahasiswa
                                </h1>

                                <p className="mt-1 text-sm text-slate-500">
                                    Tambahkan dan kelola
                                    data mahasiswa
                                    Angkatan 2025.
                                </p>

                            </div>

                            <div className="rounded-xl bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
                                {data.length} Mahasiswa
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

                    {/* ================================= */}
                    {/* FORM */}
                    {/* ================================= */}

                    <section className="rounded-2xl border border-white/10 bg-white/5 p-6">

                        <div className="mb-6">

                            <h2 className="text-xl font-bold">
                                Tambah Mahasiswa
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Masukkan data mahasiswa
                                baru.
                            </p>

                        </div>

                        <form
                            onSubmit={
                                handleSubmit
                            }
                            className="grid gap-5 md:grid-cols-2"
                        >

                            {/* NAMA */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Nama Lengkap
                                </label>

                                <input
                                    type="text"
                                    value={nama}
                                    onChange={(e) =>
                                        setNama(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Nama lengkap"
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none transition focus:border-blue-500"
                                />

                            </div>

                            {/* NIM */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    NIM
                                </label>

                                <input
                                    type="text"
                                    value={nim}
                                    onChange={(e) =>
                                        setNim(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Contoh: 2025001"
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none transition focus:border-blue-500"
                                />

                            </div>

                            {/* PRODI */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Program Studi
                                </label>

                                <input
                                    type="text"
                                    value={prodi}
                                    onChange={(e) =>
                                        setProdi(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Teknik Informatika"
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none transition focus:border-blue-500"
                                />

                            </div>

                            {/* KELAS */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Kelas
                                </label>

                                <input
                                    type="text"
                                    value={kelas}
                                    onChange={(e) =>
                                        setKelas(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Contoh: A"
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none transition focus:border-blue-500"
                                />

                            </div>

                            {/* ANGKATAN */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Angkatan
                                </label>

                                <input
                                    type="text"
                                    value={angkatan}
                                    onChange={(e) =>
                                        setAngkatan(
                                            e.target.value
                                        )
                                    }
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none transition focus:border-blue-500"
                                />

                            </div>

                            {/* WHATSAPP */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    WhatsApp
                                </label>

                                <input
                                    type="text"
                                    value={whatsapp}
                                    onChange={(e) =>
                                        setWhatsapp(
                                            e.target.value
                                        )
                                    }
                                    placeholder="08xxxxxxxxxx"
                                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none transition focus:border-blue-500"
                                />

                            </div>

                            {/* INSTAGRAM */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Instagram
                                </label>

                                <input
                                    type="text"
                                    value={instagram}
                                    onChange={(e) =>
                                        setInstagram(
                                            e.target.value
                                        )
                                    }
                                    placeholder="@username"
                                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none transition focus:border-blue-500"
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
                                    onChange={
                                        handleFoto
                                    }
                                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white"
                                />

                                {foto && (
                                    <p className="mt-2 text-xs text-slate-500">
                                        File:{" "}
                                        {foto.name}
                                    </p>
                                )}

                            </div>

                            {/* BUTTON */}

                            <div className="md:col-span-2">

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {saving
                                        ? "Menyimpan..."
                                        : "➕ Tambah Mahasiswa"}
                                </button>

                            </div>

                        </form>

                    </section>

                    {/* ================================= */}
                    {/* DAFTAR MAHASISWA */}
                    {/* ================================= */}

                    <section className="mt-10">

                        <div className="mb-5">

                            <h2 className="text-xl font-bold">
                                Daftar Mahasiswa
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Data mahasiswa yang
                                tersimpan di database.
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
                                    👨‍🎓
                                </div>

                                <h3 className="mt-4 text-lg font-bold">
                                    Belum ada mahasiswa
                                </h3>

                                <p className="mt-2 text-sm text-slate-500">
                                    Tambahkan mahasiswa
                                    menggunakan form di
                                    atas.
                                </p>

                            </div>

                        ) : (

                            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">

                                <div className="overflow-x-auto">

                                    <table className="w-full min-w-[900px] text-left">

                                        <thead className="border-b border-white/10 bg-white/5">

                                            <tr>

                                                <th className="px-6 py-4 text-sm text-slate-400">
                                                    Foto
                                                </th>

                                                <th className="px-6 py-4 text-sm text-slate-400">
                                                    Mahasiswa
                                                </th>

                                                <th className="px-6 py-4 text-sm text-slate-400">
                                                    NIM
                                                </th>

                                                <th className="px-6 py-4 text-sm text-slate-400">
                                                    Kelas
                                                </th>

                                                <th className="px-6 py-4 text-sm text-slate-400">
                                                    Angkatan
                                                </th>

                                                <th className="px-6 py-4 text-sm text-slate-400">
                                                    Kontak
                                                </th>

                                                <th className="px-6 py-4 text-sm text-slate-400">
                                                    Aksi
                                                </th>

                                            </tr>

                                        </thead>

                                        <tbody>

                                            {data.map(
                                                (
                                                    item
                                                ) => (

                                                    <tr
                                                        key={
                                                            item.id
                                                        }
                                                        className="border-b border-white/5 transition hover:bg-white/5"
                                                    >

                                                        {/* FOTO */}

                                                        <td className="px-6 py-4">

                                                            {item.foto ? (

                                                                <img
                                                                    src={`${SERVER}/uploads/${item.foto}`}
                                                                    alt={
                                                                        item.nama
                                                                    }
                                                                    className="h-14 w-14 rounded-full border-2 border-white/10 object-cover"
                                                                />

                                                            ) : (

                                                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-lg font-bold">
                                                                    {item.nama
                                                                        .charAt(
                                                                            0
                                                                        )
                                                                        .toUpperCase()}
                                                                </div>

                                                            )}

                                                        </td>

                                                        {/* NAMA */}

                                                        <td className="px-6 py-4">

                                                            <div>

                                                                <p className="font-semibold">
                                                                    {
                                                                        item.nama
                                                                    }
                                                                </p>

                                                                <p className="mt-1 text-xs text-slate-500">
                                                                    {
                                                                        item.prodi
                                                                    }
                                                                </p>

                                                            </div>

                                                        </td>

                                                        {/* NIM */}

                                                        <td className="px-6 py-4 text-sm text-slate-400">
                                                            {
                                                                item.nim
                                                            }
                                                        </td>

                                                        {/* KELAS */}

                                                        <td className="px-6 py-4">

                                                            <span className="rounded-lg bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
                                                                {
                                                                    item.kelas
                                                                }
                                                            </span>

                                                        </td>

                                                        {/* ANGKATAN */}

                                                        <td className="px-6 py-4 text-sm text-slate-400">
                                                            {
                                                                item.angkatan
                                                            }
                                                        </td>

                                                        {/* KONTAK */}

                                                        <td className="px-6 py-4">

                                                            <div className="space-y-1 text-sm">

                                                                {item.whatsapp && (
                                                                    <a
                                                                        href={`https://wa.me/${item.whatsapp.replace(
                                                                            /^0/,
                                                                            "62"
                                                                        )}`}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="block text-green-400 hover:underline"
                                                                    >
                                                                        WhatsApp
                                                                    </a>
                                                                )}

                                                                {item.instagram && (
                                                                    <span className="block text-pink-400">
                                                                        {
                                                                            item.instagram
                                                                        }
                                                                    </span>
                                                                )}

                                                            </div>

                                                        </td>

                                                        {/* AKSI */}

                                                        <td className="px-6 py-4">

                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        item.id
                                                                    )
                                                                }
                                                                className="rounded-lg bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
                                                            >
                                                                🗑️ Hapus
                                                            </button>

                                                        </td>

                                                    </tr>

                                                )
                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        )}

                    </section>

                </div>

            </div>

        </main>
    );
}