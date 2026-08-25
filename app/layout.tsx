import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
    title: "Informatika 25",
    description: "Website Angkatan Teknik Informatika 2025",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="id">
            <body className="bg-slate-950">

                <Navbar />

                {children}

            </body>
        </html>
    );
}