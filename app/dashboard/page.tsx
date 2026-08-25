"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api";

export default function DashboardPage() {

    const [mahasiswa, setMahasiswa] = useState(0);
    const [galeri, setGaleri] = useState(0);
    const [informasi, setInformasi] = useState(0);

    const [namaAdmin, setNamaAdmin] = useState("Admin");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                const authResponse = await fetch(
                    `${API_URL}/auth/me`,
                    {
                        credentials: "include"
                    }
                );

                if (authResponse.ok) {

                    const authData =
                        await authResponse.json();

                    setNamaAdmin(
                        authData.data?.nama || "Admin"
                    );

                }


                const mahasiswaResponse =
                    await fetch(
                        `${API_URL}/mahasiswa`
                    );

                const galeriResponse =
                    await fetch(
                        `${API_URL}/galeri`
                    );


                const mahasiswaData =
                    await mahasiswaResponse.json();

                const galeriData =
                    await galeriResponse.json();


                setMahasiswa(
                    mahasiswaData.data?.length || 0
                );

                setGaleri(
                    galeriData.data?.length || 0
                );


                // Informasi
                try {

                    const informasiResponse =
                        await fetch(
                            `${API_URL}/informasi`
                        );

                    if (informasiResponse.ok) {

                        const informasiData =
                            await informasiResponse.json();

                        setInformasi(
                            informasiData.data?.length || 0
                        );

                    }

                } catch {
                    setInformasi(0);
                }


            } catch (error) {

                console.error(
                    "Dashboard error:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };


        loadDashboard();

    }, []);


    const logout = async () => {

        try {

            await fetch(
                `${API_URL}/auth/logout`,
                {
                    method: "POST",
                    credentials: "include"
                }
            );

        } finally {

            window.location.href = "/login";

        }

    };


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
                            className="flex items-center gap-3 rounded-xl bg-blue-600 px-4 py-3 font-semibold"
                        >
                            📊
                            Dashboard
                        </Link>

                        <Link
                            href="/dashboard/mahasiswa"
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-white/5 hover:text-white"
                        >
                            👨‍🎓
                            Mahasiswa
                        </Link>

                        <Link
                            href="/dashboard/galeri"
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-white/5 hover:text-white"
                        >
                            🖼️
                            Galeri
                        </Link>

                        <Link
                            href="/dashboard/informasi"
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-white/5 hover:text-white"
                        >
                            📢
                            Informasi
                        </Link>

                    </nav>


                    <div className="border-t border-white/10 p-4">

                        <Link
                            href="/"
                            className="mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
                        >
                            🌐
                            Website
                        </Link>

                        <button
                            onClick={logout}
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-red-400 transition hover:bg-red-500/10"
                        >
                            🚪
                            Logout
                        </button>

                    </div>

                </div>

            </aside>


            {/* CONTENT */}

            <div className="lg:ml-64">

                {/* HEADER */}

                <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 backdrop-blur">

                    <div className="flex items-center justify-between px-6 py-5">

                        <div>

                            <p className="text-sm text-slate-500">
                                Dashboard
                            </p>

                            <h1 className="text-2xl font-bold">
                                Admin Panel
                            </h1>

                        </div>


                        <div className="flex items-center gap-4">

                            <div className="hidden text-right sm:block">

                                <p className="text-sm text-slate-400">
                                    Login sebagai
                                </p>

                                <p className="font-semibold">
                                    {namaAdmin}
                                </p>

                            </div>

                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold">
                                {namaAdmin.charAt(0).toUpperCase()}
                            </div>

                        </div>

                    </div>

                </header>


                {/* MAIN */}

                <div className="p-6 md:p-8">

                    {/* WELCOME */}

                    <section className="mb-8 overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 p-8">

                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
                            INFORMATIKA 2025
                        </p>

                        <h2 className="mt-3 text-3xl font-black">
                            Selamat Datang, {namaAdmin} 👋
                        </h2>

                        <p className="mt-3 text-slate-400">
                            Kelola data website angkatan
                            melalui dashboard admin.
                        </p>

                    </section>


                    {/* STATISTIK */}

                    <section className="grid gap-5 md:grid-cols-3">

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

                            <div className="flex justify-between">

                                <div>

                                    <p className="text-sm text-slate-400">
                                        Mahasiswa
                                    </p>

                                    <h3 className="mt-3 text-4xl font-black">
                                        {loading ? "..." : mahasiswa}
                                    </h3>

                                </div>

                                <span className="text-4xl">
                                    👨‍🎓
                                </span>

                            </div>

                        </div>


                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

                            <div className="flex justify-between">

                                <div>

                                    <p className="text-sm text-slate-400">
                                        Galeri
                                    </p>

                                    <h3 className="mt-3 text-4xl font-black">
                                        {loading ? "..." : galeri}
                                    </h3>

                                </div>

                                <span className="text-4xl">
                                    🖼️
                                </span>

                            </div>

                        </div>


                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

                            <div className="flex justify-between">

                                <div>

                                    <p className="text-sm text-slate-400">
                                        Informasi
                                    </p>

                                    <h3 className="mt-3 text-4xl font-black">
                                        {loading ? "..." : informasi}
                                    </h3>

                                </div>

                                <span className="text-4xl">
                                    📢
                                </span>

                            </div>

                        </div>

                    </section>


                    {/* MENU */}

                    <section className="mt-10">

                        <h2 className="text-xl font-bold">
                            Kelola Website
                        </h2>

                        <div className="mt-5 grid gap-5 md:grid-cols-3">


                            <Link
                                href="/dashboard/mahasiswa"
                                className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-blue-500/50"
                            >

                                <div className="text-4xl">
                                    👨‍🎓
                                </div>

                                <h3 className="mt-4 text-xl font-bold">
                                    Mahasiswa
                                </h3>

                                <p className="mt-2 text-sm text-slate-400">
                                    Tambahkan dan kelola data mahasiswa.
                                </p>

                            </Link>


                            <Link
                                href="/dashboard/galeri"
                                className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-purple-500/50"
                            >

                                <div className="text-4xl">
                                    🖼️
                                </div>

                                <h3 className="mt-4 text-xl font-bold">
                                    Galeri
                                </h3>

                                <p className="mt-2 text-sm text-slate-400">
                                    Upload dan kelola foto kegiatan.
                                </p>

                            </Link>


                            <Link
                                href="/dashboard/informasi"
                                className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-green-500/50"
                            >

                                <div className="text-4xl">
                                    📢
                                </div>

                                <h3 className="mt-4 text-xl font-bold">
                                    Informasi
                                </h3>

                                <p className="mt-2 text-sm text-slate-400">
                                    Kelola informasi angkatan.
                                </p>

                            </Link>

                        </div>

                    </section>

                </div>

            </div>

        </main>

    );

}