"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const API =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://trustworthy-strength-production-497e.up.railway.app/api";

const SERVER =
    API.replace(/\/api\/?$/, "");

type Galeri = {
    id: number;
    judul: string;
    deskripsi: string | null;
    foto: string | null;
    created_at?: string;
};

export default function DashboardGaleri() {

    const [galeri, setGaleri] = useState<Galeri[]>([]);

    const [judul, setJudul] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [foto, setFoto] = useState<File | null>(null);

    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // ========================================
    // CEK LOGIN
    // ========================================

    useEffect(() => {

        const token =
            localStorage.getItem("token");

        if (!token) {
            window.location.href = "/login";
            return;
        }

        loadGaleri();

    }, []);


    // ========================================
    // GET GALERI
    // ========================================

    async function loadGaleri() {

        try {

            setLoading(true);

            const response = await fetch(
                `${API}/galeri`,
                {
                    cache: "no-store"
                }
            );

            const result =
                await response.json();

            if (
                !response.ok ||
                result.status === false
            ) {
                throw new Error(
                    result.message ||
                    "Gagal mengambil data galeri"
                );
            }

            setGaleri(result.data || []);

        } catch (err) {

            console.error(
                "GET GALERI ERROR:",
                err
            );

            setError(
                err instanceof Error
                    ? err.message
                    : "Gagal mengambil data galeri"
            );

        } finally {

            setLoading(false);

        }

    }


    // ========================================
    // PILIH FOTO
    // ========================================

    function handleFoto(
        e: ChangeEvent<HTMLInputElement>
    ) {

        const file =
            e.target.files?.[0];

        if (!file) {
            setFoto(null);
            return;
        }

        // Validasi ukuran
        if (file.size > 5 * 1024 * 1024) {

            setError(
                "Ukuran foto maksimal 5 MB"
            );

            e.target.value = "";
            setFoto(null);

            return;
        }

        // Validasi format
        const allowed = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp"
        ];

        if (!allowed.includes(file.type)) {

            setError(
                "Foto harus JPG, JPEG, PNG, atau WEBP"
            );

            e.target.value = "";
            setFoto(null);

            return;
        }

        setError("");
        setFoto(file);

    }


    // ========================================
    // TAMBAH GALERI
    // ========================================

    async function handleSubmit(
        e: FormEvent<HTMLFormElement>
    ) {

        e.preventDefault();

        setError("");
        setSuccess("");

        const token =
            localStorage.getItem("token");

        if (!token) {

            window.location.href = "/login";
            return;

        }

        if (!judul.trim()) {

            setError(
                "Judul galeri wajib diisi."
            );

            return;
        }

        if (!foto) {

            setError(
                "Silakan pilih foto terlebih dahulu."
            );

            return;
        }

        try {

            setUploading(true);

            const formData =
                new FormData();

            formData.append(
                "judul",
                judul.trim()
            );

            formData.append(
                "deskripsi",
                deskripsi.trim()
            );

            formData.append(
                "foto",
                foto
            );

            const response =
                await fetch(
                    `${API}/galeri`,
                    {
                        method: "POST",

                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        },

                        body: formData
                    }
                );

            const result =
                await response.json();

            console.log(
                "UPLOAD GALERI:",
                result
            );

            // Token expired
            if (response.status === 401) {

                localStorage.removeItem(
                    "token"
                );

                localStorage.removeItem(
                    "admin"
                );

                window.location.href =
                    "/login";

                return;
            }

            if (
                !response.ok ||
                result.status === false
            ) {

                throw new Error(
                    result.message ||
                    result.error ||
                    "Gagal menambahkan galeri"
                );

            }

            setSuccess(
                "Foto galeri berhasil ditambahkan!"
            );

            // Reset form
            setJudul("");
            setDeskripsi("");
            setFoto(null);

            const fileInput =
                document.getElementById(
                    "foto"
                ) as HTMLInputElement | null;

            if (fileInput) {
                fileInput.value = "";
            }

            // Refresh data
            await loadGaleri();

        } catch (err) {

            console.error(
                "UPLOAD GALERI ERROR:",
                err
            );

            setError(
                err instanceof Error
                    ? err.message
                    : "Terjadi kesalahan pada server"
            );

        } finally {

            setUploading(false);

        }

    }


    // ========================================
    // HAPUS GALERI
    // ========================================

    async function handleDelete(
        id: number
    ) {

        const yakin =
            window.confirm(
                "Yakin ingin menghapus galeri ini?"
            );

        if (!yakin) {
            return;
        }

        const token =
            localStorage.getItem("token");

        if (!token) {

            window.location.href =
                "/login";

            return;
        }

        try {

            const response =
                await fetch(
                    `${API}/galeri/${id}`,
                    {
                        method: "DELETE",

                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            const result =
                await response.json();

            if (response.status === 401) {

                localStorage.removeItem(
                    "token"
                );

                localStorage.removeItem(
                    "admin"
                );

                window.location.href =
                    "/login";

                return;
            }

            if (
                !response.ok ||
                result.status === false
            ) {

                throw new Error(
                    result.message ||
                    "Gagal menghapus galeri"
                );

            }

            setSuccess(
                "Galeri berhasil dihapus."
            );

            await loadGaleri();

        } catch (err) {

            console.error(
                "DELETE GALERI ERROR:",
                err
            );

            setError(
                err instanceof Error
                    ? err.message
                    : "Gagal menghapus galeri"
            );

        }

    }


    // ========================================
    // LOGOUT
    // ========================================

    function handleLogout() {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "admin"
        );

        window.location.href =
            "/login";

    }


    // ========================================
    // URL FOTO
    // ========================================

    function getFotoUrl(
        foto: string | null
    ) {

        if (!foto) {
            return null;
        }

        // Jika sudah URL
        if (
            foto.startsWith("http://") ||
            foto.startsWith("https://")
        ) {
            return foto;
        }

        return `${SERVER}/uploads/${foto}`;

    }


    return (
        <main className="min-h-screen bg-black text-white">

            {/* HEADER */}

            <header className="border-b border-white/10 bg-black/80 backdrop-blur sticky top-0 z-50">

                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

                    <div>

                        <h1 className="text-xl md:text-2xl font-bold">
                            Dashboard Galeri
                        </h1>

                        <p className="text-sm text-gray-400">
                            Kelola galeri Informatika 25
                        </p>

                    </div>

                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition text-sm"
                    >
                        Logout
                    </button>

                </div>

            </header>


            <div className="max-w-7xl mx-auto px-4 py-8">

                {/* NAVIGASI */}

                <div className="flex flex-wrap gap-3 mb-8">

                    <a
                        href="/dashboard"
                        className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10"
                    >
                        Dashboard
                    </a>

                    <a
                        href="/dashboard/mahasiswa"
                        className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10"
                    >
                        Mahasiswa
                    </a>

                    <a
                        href="/dashboard/galeri"
                        className="px-4 py-2 rounded-lg bg-purple-600"
                    >
                        Galeri
                    </a>

                    <a
                        href="/dashboard/informasi"
                        className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10"
                    >
                        Informasi
                    </a>

                </div>


                {/* PESAN */}

                {error && (

                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
                        {error}
                    </div>

                )}

                {success && (

                    <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400">
                        {success}
                    </div>

                )}


                {/* FORM */}

                <section className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-7 mb-10">

                    <h2 className="text-xl font-bold mb-6">
                        Tambah Foto Galeri
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <div>

                            <label className="block text-sm text-gray-300 mb-2">
                                Judul
                            </label>

                            <input
                                type="text"
                                value={judul}
                                onChange={(e) =>
                                    setJudul(
                                        e.target.value
                                    )
                                }
                                placeholder="Contoh: Dies Natalis XII"
                                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 outline-none focus:border-purple-500"
                            />

                        </div>


                        <div>

                            <label className="block text-sm text-gray-300 mb-2">
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
                                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 outline-none focus:border-purple-500 resize-none"
                            />

                        </div>


                        <div>

                            <label className="block text-sm text-gray-300 mb-2">
                                Foto
                            </label>

                            <input
                                id="foto"
                                type="file"
                                accept="image/jpeg,image/jpg,image/png,image/webp"
                                onChange={handleFoto}
                                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10"
                            />

                            <p className="text-xs text-gray-500 mt-2">
                                JPG, JPEG, PNG, WEBP — maksimal 5 MB
                            </p>

                        </div>


                        {foto && (

                            <div className="text-sm text-gray-400">

                                Foto dipilih:{" "}

                                <span className="text-white">
                                    {foto.name}
                                </span>

                            </div>

                        )}


                        <button
                            type="submit"
                            disabled={uploading}
                            className="w-full md:w-auto px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition"
                        >
                            {uploading
                                ? "Mengupload..."
                                : "Tambah Galeri"}
                        </button>

                    </form>

                </section>


                {/* DAFTAR GALERI */}

                <section>

                    <div className="flex items-center justify-between mb-5">

                        <h2 className="text-xl font-bold">
                            Daftar Galeri
                        </h2>

                        <span className="text-sm text-gray-500">
                            {galeri.length} foto
                        </span>

                    </div>


                    {loading ? (

                        <div className="text-center py-16 text-gray-400">
                            Memuat galeri...
                        </div>

                    ) : galeri.length === 0 ? (

                        <div className="text-center py-16 text-gray-500 border border-white/10 rounded-2xl">
                            Belum ada galeri.
                        </div>

                    ) : (

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                            {galeri.map((item) => {

                                const fotoUrl =
                                    getFotoUrl(
                                        item.foto
                                    );

                                return (

                                    <article
                                        key={item.id}
                                        className="overflow-hidden rounded-2xl bg-white/5 border border-white/10"
                                    >

                                        {fotoUrl && (

                                            <img
                                                src={fotoUrl}
                                                alt={item.judul}
                                                className="w-full h-56 object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.style.display =
                                                        "none";
                                                }}
                                            />

                                        )}

                                        <div className="p-5">

                                            <h3 className="font-bold text-lg mb-2">
                                                {item.judul}
                                            </h3>

                                            {item.deskripsi && (

                                                <p className="text-sm text-gray-400 mb-5">
                                                    {item.deskripsi}
                                                </p>

                                            )}

                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        item.id
                                                    )
                                                }
                                                className="w-full py-2 rounded-lg bg-red-600/20 text-red-400 border border-red-500/20 hover:bg-red-600 hover:text-white transition"
                                            >
                                                Hapus
                                            </button>

                                        </div>

                                    </article>

                                );

                            })}

                        </div>

                    )}

                </section>

            </div>

        </main>
    );
}