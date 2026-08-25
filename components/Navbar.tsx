
"use client";

import { useState } from "react";
import Link from "next/link";

const menuItems = [
    {
        href: "/",
        label: "Home",
        icon: "⌂",
    },
    {
        href: "/mahasiswa",
        label: "Mahasiswa",
        
    },
    {
        href: "/galeri",
        label: "Galeri",
        
    },
    {
        href: "/informasi",
        label: "Informasi",
        
    },
    {
        href: "/kontak",
        label: "Kontak",
        
    },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 text-white shadow-lg shadow-black/10 backdrop-blur-xl">

            <div className="mx-auto max-w-7xl px-4 sm:px-6">

                {/* ========================= */}
                {/* NAVBAR UTAMA */}
                {/* ========================= */}

                <div className="flex h-16 items-center justify-between">

                    {/* LOGO */}

                    <Link
                        href="/"
                        onClick={closeMenu}
                        className="group flex items-center gap-1 text-lg font-black tracking-tight sm:text-xl"
                    >

                        <span className="transition duration-300 group-hover:text-blue-400">
                            INFORMATIKA
                        </span>

                        <span className="text-blue-500 transition duration-300 group-hover:text-cyan-400">
                            25
                        </span>

                    </Link>


                    {/* ========================= */}
                    {/* MENU DESKTOP */}
                    {/* ========================= */}

                    <div className="hidden items-center gap-1 md:flex">

                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="group relative rounded-xl px-4 py-2 text-sm font-medium text-slate-400 transition-all duration-300 hover:bg-white/5 hover:text-white"
                            >

                                <span className="relative z-10">
                                    {item.label}
                                </span>

                                {/* garis bawah */}

                                <span className="absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-blue-500 transition-all duration-300 group-hover:w-8" />

                            </Link>
                        ))}


                        {/* LOGIN DESKTOP */}

                        <Link
                            href="/login"
                            className="ml-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-bold shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-blue-500/40"
                        >
                            Login
                        </Link>

                    </div>


                    {/* ========================= */}
                    {/* MOBILE BUTTON */}
                    {/* ========================= */}

                    <button
                        type="button"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={
                            menuOpen
                                ? "Tutup menu"
                                : "Buka menu"
                        }
                        aria-expanded={menuOpen}
                        className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-500/10 md:hidden"
                    >

                        <div className="relative h-5 w-5">

                            {/* GARIS 1 */}

                            <span
                                className={`absolute left-0 top-1 block h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
                                    menuOpen
                                        ? "top-2.5 rotate-45"
                                        : ""
                                }`}
                            />

                            {/* GARIS 2 */}

                            <span
                                className={`absolute left-0 top-2.5 block h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
                                    menuOpen
                                        ? "scale-0 opacity-0"
                                        : ""
                                }`}
                            />

                            {/* GARIS 3 */}

                            <span
                                className={`absolute left-0 top-4 block h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
                                    menuOpen
                                        ? "top-2.5 -rotate-45"
                                        : ""
                                }`}
                            />

                        </div>

                    </button>

                </div>


                {/* ========================= */}
                {/* MOBILE MENU */}
                {/* ========================= */}

                <div
                    className={`grid overflow-hidden transition-all duration-500 ease-in-out md:hidden ${
                        menuOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                    }`}
                >

                    <div className="min-h-0">

                        <div className="border-t border-white/10 pb-4 pt-3">

                            {/* MENU ITEMS */}

                            <div className="space-y-1">

                                {menuItems.map((item, index) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={closeMenu}
                                        style={{
                                            transitionDelay: menuOpen
                                                ? `${index * 50}ms`
                                                : "0ms",
                                        }}
                                        className={`group flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-all duration-300 ${
                                            menuOpen
                                                ? "translate-x-0 opacity-100"
                                                : "-translate-x-5 opacity-0"
                                        } hover:bg-blue-500/10`}
                                    >

                                        {/* ICON */}

                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg transition-all duration-300 group-hover:border-blue-500/30 group-hover:bg-blue-500/10 group-hover:scale-105">
                                            {item.icon}
                                        </span>


                                        {/* TEXT */}

                                        <div className="flex-1">

                                            <p className="text-sm font-semibold text-slate-200 transition-colors group-hover:text-white">
                                                {item.label}
                                            </p>

                                            <p className="mt-0.5 text-[11px] text-slate-500">
                                                {item.label === "Home" &&
                                                    "Halaman utama"}

                                                {item.label === "Mahasiswa" &&
                                                    "Daftar mahasiswa"}

                                                {item.label === "Galeri" &&
                                                    "Dokumentasi angkatan"}

                                                {item.label === "Informasi" &&
                                                    "Informasi terbaru"}

                                                {item.label === "Kontak" &&
                                                    "Hubungi kami"}
                                            </p>

                                        </div>


                                        {/* ARROW */}

                                        <span className="text-lg text-slate-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-400">
                                            →
                                        </span>

                                    </Link>
                                ))}

                            </div>


                            {/* LOGIN */}

                            <div className="mt-3 border-t border-white/10 pt-3">

                                <Link
                                    href="/login"
                                    onClick={closeMenu}
                                    style={{
                                        transitionDelay: menuOpen
                                            ? "250ms"
                                            : "0ms",
                                    }}
                                    className={`group flex items-center gap-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3.5 shadow-lg shadow-blue-600/20 transition-all duration-500 ${
                                        menuOpen
                                            ? "translate-y-0 opacity-100"
                                            : "translate-y-3 opacity-0"
                                    }`}
                                >

                                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-lg">
                                        
                                    </span>

                                    <div className="flex-1">

                                        <p className="text-sm font-bold">
                                            Login Admin
                                        </p>

                                        <p className="mt-0.5 text-[11px] text-blue-100">
                                            Kelola website
                                        </p>

                                    </div>

                                    <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                                        →
                                    </span>

                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </nav>
    );
}

