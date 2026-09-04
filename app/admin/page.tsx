"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {

    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handleLogin = async (
        e: FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        setError("");
        setLoading(true);


        try {

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    credentials: "include",

                    body: JSON.stringify({
                        username,
                        password
                    })
                }
            );


            const result = await response.json();


            if (!response.ok) {

                throw new Error(
                    result.message ||
                    "Login gagal"
                );

            }


            router.push("/admin");

            router.refresh();


        } catch (error) {

            setError(
                error instanceof Error
                    ? error.message
                    : "Login gagal"
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">

            <div className="w-full max-w-md">


                <div className="mb-8 text-center">

                    <h1 className="text-3xl font-black">

                        INFORMATIKA
                        <span className="text-blue-500">
                            25
                        </span>

                    </h1>

                    <p className="mt-2 text-slate-400">
                        Admin Dashboard
                    </p>

                </div>


                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">

                    <h2 className="text-2xl font-bold">
                        Login Admin
                    </h2>

                    <p className="mt-2 text-sm text-slate-400">
                        Silakan login untuk mengakses dashboard.
                    </p>


                    {error && (

                        <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">

                            {error}

                        </div>

                    )}


                    <form
                        onSubmit={handleLogin}
                        className="mt-6 space-y-5"
                    >


                        <div>

                            <label className="mb-2 block text-sm font-medium">
                                Username
                            </label>

                            <input
                                type="text"
                                value={username}
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                                placeholder="Masukkan username"
                                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none focus:border-blue-500"
                                required
                            />

                        </div>


                        <div>

                            <label className="mb-2 block text-sm font-medium">
                                Password
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                placeholder="Masukkan password"
                                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none focus:border-blue-500"
                                required
                            />

                        </div>


                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-blue-600 py-3 font-bold transition hover:bg-blue-500 disabled:opacity-50"
                        >

                            {loading
                                ? "Memproses..."
                                : "Login"}

                        </button>

                    </form>


                    <div className="mt-6 text-center">

                        <a
                            href="/"
                            className="text-sm text-slate-500 transition hover:text-blue-400"
                        >
                            ← Kembali ke website
                        </a>

                    </div>

                </div>

            </div>

        </main>

    );

}