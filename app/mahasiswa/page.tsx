import { getMahasiswa } from "@/lib/api";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://trustworthy-strength-production-497e.up.railway.app/api";

const API_SERVER = API_URL.replace(/\/api\/?$/, "");

export default async function MahasiswaPage() {
    let mahasiswa = [];
    let error = "";

    try {
        mahasiswa = await getMahasiswa();
    } catch (err) {
        error =
            err instanceof Error
                ? err.message
                : "Gagal mengambil data mahasiswa";
    }

    return (
        <main className="min-h-screen bg-[#05080f] px-6 pb-24 pt-32 text-white">

            {/* HEADER */}
            <section className="mx-auto max-w-6xl text-center">

                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.4em] text-blue-400">
                    INFORMATIKA 25
                </p>

                <h1 className="text-4xl font-bold md:text-6xl">
                    Mahasiswa
                </h1>

                <p className="mx-auto mt-4 max-w-2xl text-gray-400">
                    Keluarga besar mahasiswa Teknik Informatika
                    Angkatan 2025.
                </p>

                {!error && (
                    <div className="mx-auto mt-6 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm text-blue-400">
                        {mahasiswa.length} Mahasiswa
                    </div>
                )}

            </section>

            {/* ERROR */}
            {error && (
                <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center">

                    <p className="font-semibold text-red-400">
                        ⚠️ Gagal mengambil data mahasiswa
                    </p>

                    <p className="mt-2 text-sm text-red-300">
                        {error}
                    </p>

                </div>
            )}

            {/* MAHASISWA */}
            {!error && (
                <section className="mx-auto mt-16 max-w-6xl">

                    {mahasiswa.length === 0 ? (

                        <div className="rounded-3xl border border-white/10 bg-[#0b111d] p-16 text-center">

                            <div className="text-5xl">
                                👨‍🎓
                            </div>

                            <h2 className="mt-4 text-xl font-semibold">
                                Belum ada mahasiswa
                            </h2>

                            <p className="mt-2 text-gray-500">
                                Data mahasiswa belum tersedia.
                            </p>

                        </div>

                    ) : (

                        <div
                            className="
                                grid
                                grid-cols-1
                                justify-items-center
                                gap-12
                                sm:grid-cols-2
                                lg:grid-cols-3
                                xl:grid-cols-4
                            "
                        >

                            {mahasiswa.map((item: any) => {

                                /*
                                 * Foto dari backend Railway.
                                 *
                                 * Database hanya menyimpan nama file,
                                 * contoh:
                                 * 1789101137435-127196133.jpeg
                                 *
                                 * Maka URL lengkapnya:
                                 * https://trustworthy-strength-production-497e.up.railway.app/uploads/...
                                 */

                                const fotoUrl = item.foto
                                    ? `${API_SERVER}/uploads/${item.foto}`
                                    : null;

                                return (

                                    <div
                                        key={item.id}
                                        className="
                                            group
                                            w-full
                                            max-w-[310px]
                                            overflow-hidden
                                            rounded-[22px]
                                            border
                                            border-white/10
                                            bg-[#0b111d]
                                            shadow-[0_20px_60px_rgba(0,0,0,0.35)]
                                            transition-all
                                            duration-500
                                            hover:-translate-y-3
                                            hover:border-blue-500/40
                                            hover:shadow-[0_25px_70px_rgba(0,80,255,0.15)]
                                        "
                                    >

                                        {/* TOP BAR */}
                                        <div className="flex h-16 items-center border-b border-white/10 px-5">

                                            <div className="flex gap-2">

                                                <span className="h-3 w-3 rounded-full bg-red-400" />

                                                <span className="h-3 w-3 rounded-full bg-yellow-400" />

                                                <span className="h-3 w-3 rounded-full bg-green-500" />

                                            </div>

                                            <div className="ml-5 h-px flex-1 bg-white/5" />

                                        </div>

                                        {/* FOTO */}
                                        <div className="p-5">

                                            <div
                                                className="
                                                    relative
                                                    aspect-[4/5]
                                                    overflow-hidden
                                                    rounded-[15px]
                                                    bg-[#111827]
                                                "
                                            >

                                                {fotoUrl ? (

                                                    <img
                                                        src={fotoUrl}
                                                        alt={item.nama}
                                                        className="
                                                            h-full
                                                            w-full
                                                            object-cover
                                                            transition-transform
                                                            duration-700
                                                            group-hover:scale-105
                                                        "
                                                    />

                                                ) : (

                                                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-950 to-slate-950">

                                                        <div className="text-center">

                                                            <div className="text-7xl">
                                                                👤
                                                            </div>

                                                            <p className="mt-4 text-sm text-gray-500">
                                                                Foto belum tersedia
                                                            </p>

                                                        </div>

                                                    </div>

                                                )}

                                            </div>

                                            {/* NAMA */}
                                            <div className="px-2 pb-2 pt-6 text-center">

                                                <h2
                                                    className="
                                                        text-lg
                                                        font-bold
                                                        leading-snug
                                                        text-white
                                                        transition-colors
                                                        duration-300
                                                        group-hover:text-blue-400
                                                    "
                                                >
                                                    {item.nama}
                                                </h2>

                                            </div>

                                        </div>

                                    </div>

                                );
                            })}

                        </div>

                    )}

                </section>
            )}

        </main>
    );
}