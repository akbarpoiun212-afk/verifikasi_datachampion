import { useState, useEffect } from 'react';
import { BarChart3, CheckCircle, Award } from 'lucide-react';

interface TableauItem {
    id: number;
    code: string;
    jabatan: string;
    nama: string;
    jenis: string;
}

export default function Tableau() {
    const [dataTableau, setDataTableau] = useState<TableauItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    'https://eeslmmfvjdqdmfwkjriq.supabase.co/rest/v1/Tableau?select=*&apikey=sb_publishable_6bxkx4_2Df6Owbj9vP2Rew_KIPECKau'
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                setDataTableau(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : String(err));
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex justify-center items-center min-h-[50vh]">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-600 mb-4"></div>
                    <p className="text-slate-600 font-medium">Memuat data sertifikat...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="bg-red-50 border border-red-200 p-6 rounded-xl text-center">
                    <p className="text-red-700 font-medium">Terjadi kesalahan: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-slate-50 min-h-screen">

            {/* Header Section - Menggunakan Biru sebagai Dominan */}
            <div className="text-center mb-16 animate-fade-in-up">
                <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl mb-6 shadow-xl shadow-blue-900/5 ring-1 ring-slate-100">
                    <BarChart3 className="text-blue-600 w-10 h-10" />
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 tracking-tight">
                    Data Champion Society
                </h2>
                <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                    Event Mini Bootcamp Data Visualization With Tableau
                </p>
                <div className="w-16 h-1.5 bg-blue-600 rounded-full mx-auto mt-6 opacity-80"></div>
            </div>

            {/* Grid Card Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {dataTableau.length > 0 ? (
                    dataTableau.map((item) => (
                        <div
                            key={item.id}
                            className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200 hover:border-blue-400 relative overflow-hidden flex flex-col justify-between h-full"
                        >
                            {/* Dekorasi Background halus */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full opacity-50 transition-opacity group-hover:opacity-100"></div>

                            <div>
                                {/* Header Card: Tags */}
                                <div className="flex justify-between items-start mb-5 relative z-10">
                                    {/* Tag ID: Merah Lembut */}
                                    <span className="font-mono text-[10px] uppercase tracking-wider text-red-700 bg-red-50 px-2.5 py-1 rounded-md ring-1 ring-red-600/10 font-bold">
                                        {item.code}
                                    </span>

                                    {/* Tag Role: Kuning/Amber Lembut (Lebih kontras dari kuning biasa) */}
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 ring-1 ring-amber-600/20 font-bold text-[10px] uppercase tracking-wide">
                                        <Award size={12} />
                                        {item.jabatan}
                                    </div>
                                </div>

                                {/* Content: Nama & Judul */}
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-blue-700 transition-colors">
                                        {item.nama}
                                    </h3>
                                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                        {item.jenis}
                                    </p>
                                </div>
                            </div>

                            {/* Action Button - OUTLINE STYLE (Agar tidak tabrakan warna) */}
                            <button
                                onClick={() => window.open(`/verify/${item.code}`, '_blank')}
                                className="w-full py-2.5 px-4 flex items-center justify-center gap-2 
                                bg-white border-2 border-blue-600 text-blue-700 
                                hover:bg-blue-600 hover:text-white 
                                rounded-lg transition-all duration-200 
                                text-sm font-bold tracking-wide mt-auto"
                            >
                                <CheckCircle size={18} />
                                <span>Verify Certificate</span>
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
                        <div className="p-4 bg-slate-50 rounded-full mb-3">
                            <BarChart3 className="text-slate-400 w-8 h-8" />
                        </div>
                        <p className="text-slate-500 text-lg font-medium">Tidak ada data sertifikat ditemukan</p>
                    </div>
                )}
            </div>
        </div>
    );
}
