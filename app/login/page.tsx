"use client";

import { FormEvent, useState } from "react";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://trustworthy-strength-production-497e.up.railway.app/api";

export default function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setError("");

        if (!username || !password) {
            setError("Username dan password wajib diisi.");
            return;
        }

        setLoading(true);

        try {

            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            const result = await response.json();

            console.log("LOGIN RESPONSE:", result);

            if (!response.ok || result.status === false) {
                throw new Error(
                    result.message ||
                    result.error ||
                    "Username atau password salah."
                );
            }

            // Simpan JWT
            localStorage.setItem("token", result.token);

            // Simpan data admin jika diperlukan
            if (result.admin) {
                localStorage.setItem(
                    "admin",
                    JSON.stringify(result.admin)
                );
            }

            // Masuk dashboard
            window.location.href = "/dashboard";

        } catch (error) {

            console.error("LOGIN ERROR:", error);

            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Terjadi kesalahan saat login.");
            }

        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-black text-white px-4">

            <div className="w-full max-w-md">

                <div className="mb-8 text-center">

                    <h1 className="text-4xl font-bold mb-2">
                        Informatika 25
                    </h1>

                    <p className="text-gray-400">
                        Admin Login
                    </p>

                </div>

                <form
                    onSubmit={handleLogin}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur"
                >

                    <div className="mb-5">

                        <label className="block text-sm text-gray-300 mb-2">
                            Username
                        </label>

                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Masukkan username"
                            autoComplete="username"
                            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 outline-none focus:border-purple-500 text-white"
                        />

                    </div>

                    <div className="mb-5">

                        <label className="block text-sm text-gray-300 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Masukkan password"
                            autoComplete="current-password"
                            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 outline-none focus:border-purple-500 text-white"
                        />

                    </div>

                    {error && (
                        <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition"
                    >
                        {loading ? "Memproses..." : "Login"}
                    </button>

                </form>

            </div>

        </main>
    );
}