const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api";
export async function getMahasiswa() {
    try {
        const response = await fetch(
            `${API_URL}/mahasiswa`,
            {
                cache: "no-store",
            }
        );

        const result = await response.json();

        console.log("MAHASISWA API:", result);

        if (!response.ok || result.status === false) {
            throw new Error(
                result.error ||
                result.message ||
                "Gagal mengambil data mahasiswa"
            );
        }

        return result.data || [];

    } catch (error) {

        console.error(
            "GET MAHASISWA ERROR:",
            error
        );

        throw error;
    }
}