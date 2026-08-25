"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok || !data.status) {
                alert(data.message || "Username atau password salah");
                return;
            }

            // Simpan token JWT
            localStorage.setItem("token", data.token);

            // Simpan data admin
            localStorage.setItem(
                "admin",
                JSON.stringify(data.admin)
            );

            // Redirect ke dashboard
            window.location.href = "/dashboard";

        } catch (error) {
            console.error("LOGIN ERROR:", error);

            alert(
                "Tidak dapat terhubung ke server. Pastikan backend berjalan di port 5000."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030712] px-4 py-10 text-white">

            {/* ========================= */}
            {/* BACKGROUND */}
            {/* ========================= */}

            <div className="absolute inset-0 overflow-hidden">

                <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />

                <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-500/15 blur-[120px]" />

                <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/5 blur-[100px]" />

                {/* GRID */}

                <div
                    className="absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                        backgroundSize: "45px 45px",
                    }}
                />

            </div>


            {/* ========================= */}
            {/* LOGIN CARD */}
            {/* ========================= */}

            <div className="relative z-10 w-full max-w-md">

                <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-8">


                    {/* ========================= */}
                    {/* LOGO */}
                    {/* ========================= */}

                    <div className="mb-8 flex justify-center">

                        <div className="relative">

                            <div className="absolute inset-0 rounded-2xl bg-blue-500/40 blur-xl" />

                            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-600 to-cyan-500 shadow-xl shadow-blue-500/20">

                                <span className="text-3xl font-black">
                                    25
                                </span>

                            </div>

                        </div>

                    </div>


                    {/* ========================= */}
                    {/* TITLE */}
                    {/* ========================= */}

                    <div className="mb-8 text-center">

                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.35em] text-blue-400">
                            INFORMATIKA 25
                        </p>

                        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                            Login Admin
                        </h1>

                        <p className="mt-3 text-sm text-slate-400">
                            Kelola website Angkatan 2025
                        </p>

                    </div>


                    {/* ========================= */}
                    {/* FORM */}
                    {/* ========================= */}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >


                        {/* ========================= */}
                        {/* USERNAME */}
                        {/* ========================= */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-200">
                                Username
                            </label>

                            <div className="group relative">

                                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-500 transition group-focus-within:text-blue-400">
                                    👤
                                </span>

                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    placeholder="Masukkan username"
                                    required
                                    autoComplete="username"
                                    className="h-14 w-full rounded-2xl border border-white/10 bg-slate-950/60 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60 focus:bg-slate-950 focus:ring-4 focus:ring-blue-500/10"
                                />

                            </div>

                        </div>


                        {/* ========================= */}
                        {/* PASSWORD */}
                        {/* ========================= */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-200">
                                Password
                            </label>

                            <div className="group relative">

                                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-500 transition group-focus-within:text-blue-400">
                                    🔒
                                </span>

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Masukkan password"
                                    required
                                    autoComplete="current-password"
                                    className="h-14 w-full rounded-2xl border border-white/10 bg-slate-950/60 pl-12 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60 focus:bg-slate-950 focus:ring-4 focus:ring-blue-500/10"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    aria-label={
                                        showPassword
                                            ? "Sembunyikan password"
                                            : "Tampilkan password"
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
                                >
                                    {showPassword ? "🙈" : "👁"}
                                </button>

                            </div>

                        </div>


                        {/* ========================= */}
                        {/* LOGIN BUTTON */}
                        {/* ========================= */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative mt-3 h-14 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 font-bold shadow-lg shadow-blue-600/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60"
                        >

                            <span className="relative z-10 flex items-center justify-center gap-2">

                                {loading ? (
                                    <>
                                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                                        Memproses...
                                    </>
                                ) : (
                                    <>
                                        Login Admin

                                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                                            →
                                        </span>
                                    </>
                                )}

                            </span>

                            <div className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-full" />

                        </button>

                    </form>


                    {/* ========================= */}
                    {/* DIVIDER */}
                    {/* ========================= */}

                    <div className="my-7 flex items-center gap-4">

                        <div className="h-px flex-1 bg-white/10" />

                        <span className="text-xs text-slate-600">
                            ADMIN AREA
                        </span>

                        <div className="h-px flex-1 bg-white/10" />

                    </div>


                    {/* ========================= */}
                    {/* BACK HOME */}
                    {/* ========================= */}

                    <Link
                        href="/"
                        className="group flex items-center justify-center gap-2 text-sm text-slate-500 transition hover:text-blue-400"
                    >

                        <span className="transition-transform group-hover:-translate-x-1">
                            ←
                        </span>

                        Kembali ke Home

                    </Link>

                </div>


                {/* ========================= */}
                {/* FOOTER */}
                {/* ========================= */}

                <p className="mt-6 text-center text-xs text-slate-600">
                    © 2025 Informatika 25 · Universitas Khairun
                </p>

            </div>

        </main>
    );
}